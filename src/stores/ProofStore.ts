import { proxy } from 'valtio'
import { requestERC721Attestation } from 'helpers/attestor'
import PersistableStore from 'stores/persistence/PersistableStore'
import Proof from 'models/Proof'
import WalletStore from 'stores/WalletStore'
import handleError from 'helpers/handleError'

const input = {
  message: [
    48, 120, 98, 102, 55, 52, 52, 56, 51, 68, 66, 57, 49, 52, 49, 57, 50, 98,
    98, 48, 97, 57, 53, 55, 55, 102, 51, 100, 56, 70, 98, 50, 57, 97, 54, 100,
    52, 99, 48, 56, 101, 69, 45, 111, 119, 110, 115, 45, 48, 120, 55, 50, 50,
    66, 48, 54, 55, 54, 70, 52, 53, 55, 97, 70, 101, 49, 51, 101, 52, 55, 57,
    101, 66, 50, 97, 56, 65, 52, 68, 101, 56, 56, 66, 65, 49, 53, 66, 50, 99,
    54, 45, 56, 110, 104, 76, 77, 77,
  ],
  tokenAddress: [
    48, 120, 55, 50, 50, 66, 48, 54, 55, 54, 70, 52, 53, 55, 97, 70, 101, 49,
    51, 101, 52, 55, 57, 101, 66, 50, 97, 56, 65, 52, 68, 101, 56, 56, 66, 65,
    49, 53, 66, 50, 99, 54,
  ],
  pubKeyX:
    '13578469780849928704623562188688413596472689853032556827882124682666588837591',
  pubKeyY:
    '19666119278979591965777251527504328920019005148768920573158906368334798877314',
  R8x: '5531156400626749350384660531173667212099666815118526535189261030936450885444',
  R8y: '8829535308446341320380897334391409050996425369575435553131772475861663948282',
  S: '6765222620750550035337342279943234739505026618973357501330254202593121294',
  M: '53372506772912948865981934166990734138022776710900778254083774573497151961',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

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
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        'zk/circuit.wasm',
        'zk/circuit_final.zkey'
      )
      console.log(proof, publicSignals)
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
