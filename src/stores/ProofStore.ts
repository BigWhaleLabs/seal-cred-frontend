import { DataKeys } from 'models/DataKeys'
import { PersistableStore } from '@big-whale-labs/stores'
import {
  getEddsaPublicKey,
  requestAddressOwnershipAttestation,
  requestBalanceAttestation,
} from 'helpers/proofs/attestor'
import { proxy } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import ERC721Proof, { ERC721ProofSchema } from 'helpers/proofs/ERC721Proof'
import EmailProof, { EmailProofSchema } from 'helpers/proofs/EmailProof'
import Network from 'models/Network'
import ProofResult from 'models/ProofResult'
import WalletStore from 'stores/WalletStore'
import checkNavigator from 'helpers/proofs/checkNavigator'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import env from 'helpers/env'
import getNullifierMessage from 'helpers/proofs/getNullifierMessage'
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

  get ledgerToProofs() {
    return dataShapeObject((ledgerName) =>
      this.proofsCompleted.filter((proof) => proof.dataType === ledgerName)
    )
  }

  get emailProofsCompleted() {
    const selected = []
    for (const proof of this.proofsCompleted) {
      if (proof instanceof EmailProof) selected.push(proof)
    }
    return selected
  }

  get eRC721ProofsCompleted() {
    const selected = []
    for (const proof of this.proofsCompleted) {
      if (proof instanceof ERC721Proof) selected.push(proof)
    }
    return selected
  }

  get goerlieRC721ProofsCompleted() {
    const selected = []
    for (const proof of this.eRC721ProofsCompleted) {
      if (proof.network === Network.Goerli) selected.push(proof)
    }
    return selected
  }

  get mainneteRC721ProofsCompleted() {
    const selected = []
    for (const proof of this.eRC721ProofsCompleted) {
      if (proof.network === Network.Mainnet) selected.push(proof)
    }
    return selected
  }

  async generateEmail(domain: string, signature: string) {
    try {
      // Get public key
      const eddsaPublicKey = await getEddsaPublicKey()
      // Check navigator availability
      checkNavigator()
      // Create proof
      const newEmailProof = new EmailProof(domain)
      await newEmailProof.build(signature, eddsaPublicKey)
      this.proofsCompleted.push(newEmailProof)
      return newEmailProof
    } catch (e) {
      handleError(e)
    }
  }

  async generateERC721(contract: string, network: Network) {
    try {
      // Get the account
      const account = WalletStore.account
      if (!account) {
        throw new Error('No account selected')
      }
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
        eddsaPublicKey
      )
      this.proofsCompleted.push(newERC721Proof)
      return newERC721Proof
    } catch (e) {
      handleError(e)
    }
  }
}

export default proxy(new ProofStore()).makePersistent(env.VITE_ENCRYPT_KEY)
