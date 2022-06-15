import { Scalar } from 'ffjavascript'
import { getPublicKey, requestERC721Attestation } from 'helpers/attestor'
import { proxy } from 'valtio'
import { utils } from 'ethers'
import PersistableStore from 'stores/persistence/PersistableStore'
import Proof from 'models/Proof'
import WalletStore from 'stores/WalletStore'
import buildBabyJub from 'circomlibjs/babyjub'
import buildMimc7 from 'circomlibjs/mimc7'
import handleError from 'helpers/handleError'

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
      // Get the message in bytes and its hash
      const messageUInt8 = utils.toUtf8Bytes(message)
      const mimc7 = await buildMimc7()
      const M = mimc7.multiHash(messageUInt8)
      // Create BabyJub
      const babyJub = await buildBabyJub()
      const F = babyJub.F
      // Unpack signature
      const signatureBuffer = utils.arrayify(signature)
      const unpackedSignature = {
        R8: babyJub.unpackPoint(signatureBuffer.slice(0, 32)),
        S: Scalar.fromRprLE(signatureBuffer, 32, 32),
      }
      if (!unpackedSignature.R8)
        throw new Error('Unable to unpack the signature')
      // Generate the proof
      const input = {
        message: Array.from(messageUInt8),
        tokenAddress: Array.from(utils.toUtf8Bytes(contract)),
        M: F.toObject(M).toString(),
        R8x: F.toObject(unpackedSignature.R8[0]).toString(),
        R8y: F.toObject(unpackedSignature.R8[1]).toString(),
        S: unpackedSignature.S.toString(),
        pubKeyX: x,
        pubKeyY: y,
      }
      // return
      proofStore.proofsCompleted.push({
        contract,
        account,
        result: await snarkjs.groth16.fullProve(
          input,
          'zk/circuit.wasm',
          'zk/circuit_final.zkey'
        ),
      })
    } catch (e) {
      handleError(e)
    }
  }
}

const proofStore = proxy(new ProofStore()).makePersistent(true)

export default proofStore
