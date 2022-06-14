import { proxy } from 'valtio'
import { requestERC721Attestation } from 'helpers/attestor'
import PersistableStore from 'stores/persistence/PersistableStore'
import Proof from 'models/Proof'
import WalletStore from 'stores/WalletStore'
import handleError from 'helpers/handleError'

class ProofStore extends PersistableStore {
  proofsCompleted: Proof[] = []

  async generate(contract: string) {
    try {
      const account = WalletStore.account
      if (!account) throw new Error('No account found')
      const eddsaMessage = `${WalletStore.account} for SealCred`
      const eddsaSignature = await WalletStore.signMessage(eddsaMessage)
      if (!eddsaSignature) throw new Error('Signature is not found')
      const { signature, message } = await requestERC721Attestation(
        eddsaSignature,
        contract,
        eddsaMessage
      )
      console.log(signature, message)
      // TODO: show zkp as being generated
      // TODO: generate the zkp
      // TODO: move zkp to completed zkps
    } catch (e) {
      handleError(e)
    }
  }
}

const proofStore = proxy(new ProofStore()).makePersistent(true)

export default proofStore
