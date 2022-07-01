import { getPublicKey, requestERC721Attestation } from 'helpers/attestor'
import { proxy } from 'valtio'
import BaseProof from 'helpers/BaseProof'
import ERC721Proof, { ERC721ProofSchema } from 'helpers/ERC721Proof'
import EmailProof, { EmailProofSchema } from 'helpers/EmailProof'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResult from 'models/ProofResult'
import WalletStore from 'stores/WalletStore'
import checkNavigator from 'helpers/checkNavigator'
import handleError from 'helpers/handleError'
import mimcHash from 'circomlibjs/mimc'
import parseSignature from 'helpers/parseSignature'

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

  async generateEmail(domain: string, secret: string) {
    try {
      const { x, y } = await getPublicKey()

      const [signature, nullifier] = secret.split('-')

      const newEmailProof = new EmailProof(domain)
      await newEmailProof.build(nullifier, signature, x, y)

      // Check navigator availability
      checkNavigator()

      proofStore.proofsCompleted.push(newEmailProof)
    } catch (e) {
      handleError(e)
    }
  }

  async generateERC721(contract: string) {
    try {
      // Get the account
      const account = WalletStore.account
      if (!account) throw new Error('No account found')

      // Get public key
      const { x, y } = await getPublicKey()

      // Get the EdDSA signature from the attestor
      const eddsaMessage = `${WalletStore.account} for SealCred`
      const eddsaSignature = await WalletStore.signMessage(eddsaMessage)
      if (!eddsaSignature) throw new Error('Signature is not found')

      const [r_array, s_array] = parseSignature(eddsaSignature)
      const nullifierHash = mimcHash(123)(
        r_array[0],
        r_array[1],
        r_array[2],
        s_array[0],
        s_array[1],
        s_array[2]
      ).toString()

      console.log(nullifierHash)

      const r = r_array.map((x) => x.toString())
      const s = s_array.map((x) => x.toString())

      const { signature, message } = await requestERC721Attestation(
        eddsaSignature,
        contract,
        eddsaMessage
      )

      const newERC721Proof = new ERC721Proof(contract, account)

      checkNavigator()

      await newERC721Proof.build(message, signature, x, y, r, s, nullifierHash)

      proofStore.proofsCompleted.push(newERC721Proof)
    } catch (e) {
      handleError(e)
    }
  }
}

const proofStore = proxy(new ProofStore()).makePersistent(true)

export default proofStore
