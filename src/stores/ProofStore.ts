import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestBalanceAttestation,
} from 'helpers/attestor'
import { proxy } from 'valtio'
import BaseProof from 'helpers/BaseProof'
import ERC721Proof, { ERC721ProofSchema } from 'helpers/ERC721Proof'
import EmailProof, { EmailProofSchema } from 'helpers/EmailProof'
import Network from 'models/Network'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResult from 'models/ProofResult'
import WalletStore from 'stores/WalletStore'
import checkNavigator from 'helpers/checkNavigator'
import getNullifierMessage from 'helpers/getNullifierMessage'
import handleError from 'helpers/handleError'

class ProofStore extends PersistableStore {
  proofsCompleted: BaseProof[] = []

  deleteProof(proof: BaseProof) {
    this.proofsCompleted = this.proofsCompleted.filter((p) => !proof.equal(p))
  }

  reviver = (key: string, value: unknown) => {
    if (key === 'proofsCompleted') {
      return (
        value as ({ type: string; result?: ProofResult } & (
          | EmailProofSchema
          | ERC721ProofSchema
        ))[]
      ).map(({ type, result, ...rest }) => {
        if (type === EmailProof.type) {
          return EmailProof.fromJSON({
            result,
            ...(rest as EmailProofSchema),
          })
        }
        if (type === ERC721Proof.type) {
          return ERC721Proof.fromJSON({
            result,
            ...(rest as ERC721ProofSchema),
          })
        }
        return rest
      })
    }
    return value
  }

  get emailProofsCompleted() {
    const selected = []
    for (const proof of this.proofsCompleted) {
      if (proof instanceof EmailProof) selected.push(proof)
    }
    return selected
  }

  get ERC721ProofsCompleted() {
    const selected = []
    for (const proof of this.proofsCompleted) {
      if (proof instanceof ERC721Proof) selected.push(proof)
    }
    return selected
  }

  get goerliERC721ProofsCompleted() {
    const selected = []
    for (const proof of this.ERC721ProofsCompleted) {
      if (proof.network === Network.Goerli) selected.push(proof)
    }
    return selected
  }

  get mainnetERC721ProofsCompleted() {
    const selected = []
    for (const proof of this.ERC721ProofsCompleted) {
      if (proof.network === Network.Mainnet) selected.push(proof)
    }
    return selected
  }

  async generateEmail(domain: string, signature: string) {
    try {
      // Get public key
      const eddsaPublicKey = await getEddsaPublicKey()
      // Get nullifier signature
      const nullifierMessage = getNullifierMessage()
      const nullifierSignature = await WalletStore.signMessage(nullifierMessage)
      // Check navigator availability
      checkNavigator()
      // Create proof
      const newEmailProof = new EmailProof(domain)
      await newEmailProof.build(signature, eddsaPublicKey, nullifierSignature)
      this.proofsCompleted.push(newEmailProof)
      return newEmailProof
    } catch (e) {
      handleError(e)
    }
  }

  async generateERC721(contract: string, network: Network) {
    try {
      if (!WalletStore.account) {
        throw new Error('No account selected')
      }
      // Get the account
      const account = WalletStore.account
      if (!account) throw new Error('No account found')
      // Get public key
      const eddsaPublicKey = await getEddsaPublicKey()
      // Get nullifier signature
      const nullifierMessage = getNullifierMessage()
      const nullifierSignature = await WalletStore.signMessage(nullifierMessage)
      // Get ownership EdDSA attestation
      const ownershipSignature = await requestAddressOwnershipAttestation(
        nullifierSignature,
        nullifierMessage
      )
      // Get balance EdDSA attestation
      const balanceSignature = await requestBalanceAttestation(
        contract,
        network,
        account
      )
      // Get the proof
      const newERC721Proof = new ERC721Proof(contract, account, network)
      checkNavigator()
      await newERC721Proof.build(
        ownershipSignature,
        balanceSignature,
        nullifierSignature,
        eddsaPublicKey
      )
      this.proofsCompleted.push(newERC721Proof)
      return newERC721Proof
    } catch (e) {
      handleError(e)
    }
  }
}

export default proxy(new ProofStore()).makePersistent(true)
