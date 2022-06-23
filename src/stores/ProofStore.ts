import { getPublicKey, requestERC721Attestation } from 'helpers/attestor'
import { proxy } from 'valtio'
import { utils } from 'ethers'
import PersistableStore from 'stores/persistence/PersistableStore'
import Proof from 'models/Proof'
import WalletStore from 'stores/WalletStore'
import checkNavigator from 'helpers/checkNavigator'
import handleError from 'helpers/handleError'
import unpackSignature from 'helpers/unpackSignature'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

class ProofStore extends PersistableStore {
  proofsCompleted: Proof[] = []

  async generate(contract: string) {
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

      const { signature, message } = await requestERC721Attestation(
        eddsaSignature,
        contract,
        eddsaMessage
      )

      // Generate input
      const messageUInt8 = utils.toUtf8Bytes(message)
      const input = {
        message: Array.from(messageUInt8),
        tokenAddress: Array.from(utils.toUtf8Bytes(contract.toLowerCase())),
        pubKeyX: x,
        pubKeyY: y,
        ...unpackSignature(messageUInt8, signature),
      }

      // Check navigator availability
      checkNavigator()

      proofStore.proofsCompleted.push({
        contract,
        account,
        result: await snarkjs.groth16.fullProve(
          input,
          'zk/ERC721OwnershipChecker.wasm',
          'zk/ERC721OwnershipChecker_final.zkey'
        ),
      })
    } catch (e) {
      handleError(e)
    }
  }
}

const proofStore = proxy(new ProofStore()).makePersistent(true)

export default proofStore
