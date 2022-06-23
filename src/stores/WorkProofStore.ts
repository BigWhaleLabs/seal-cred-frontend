import { Scalar } from 'ffjavascript'
import { getPublicKey } from 'helpers/attestor'
import { proxy } from 'valtio'
import { utils } from 'ethers'
import PersistableStore from 'stores/persistence/PersistableStore'
import WorkProof from 'models/WorkProof'
import buildBabyJub from 'circomlibjs/babyjub'
import buildMimc7 from 'circomlibjs/mimc7'
import checkNavigator from 'helpers/checkNavigator'
import handleError from 'helpers/handleError'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const snarkjs: any

function padZeroesOnRightUint8(array: Uint8Array, length: number) {
  const padding = new Uint8Array(length - array.length)
  return utils.concat([array, padding])
}

class WorkProofStore extends PersistableStore {
  proofsCompleted: WorkProof[] = []

  async generate(domain: string, secret: string) {
    try {
      const maxDomainLength = 90
      const { x, y } = await getPublicKey()
      const [packedSignature, nullifier] = secret.split('-')

      const domainBytes = padZeroesOnRightUint8(
        utils.toUtf8Bytes(domain),
        maxDomainLength
      )

      // Get the message in bytes and its hash
      const messageUInt8 = utils.concat([
        domainBytes,
        utils.toUtf8Bytes(nullifier),
      ])
      const mimc7 = await buildMimc7()
      const M = mimc7.multiHash(messageUInt8)

      // Create BabyJub
      const babyJub = await buildBabyJub()
      const F = babyJub.F
      // Unpack signature
      const signatureBuffer = utils.arrayify(packedSignature)
      const signature = {
        R8: babyJub.unpackPoint(signatureBuffer.slice(0, 32)),
        S: Scalar.fromRprLE(signatureBuffer, 32, 32),
      }
      if (!signature.R8) throw new Error('Unable to unpack the signature')
      const input = {
        message: Array.from(messageUInt8),
        domain: Array.from(domainBytes),
        pubKeyX: x,
        pubKeyY: y,
        R8x: F.toObject(signature.R8[0]).toString(),
        R8y: F.toObject(signature.R8[1]).toString(),
        S: signature.S.toString(),
        M: F.toObject(M).toString(),
      }
      // Check navigator availability
      checkNavigator()

      // return
      workProofStore.proofsCompleted.push({
        domain,
        result: await snarkjs.groth16.fullProve(
          input,
          'zk/EmailOwnershipChecker.wasm',
          'zk/EmailOwnershipChecker_final.zkey'
        ),
      })
    } catch (e) {
      handleError(e)
    }
  }
}

const workProofStore = proxy(new WorkProofStore()).makePersistent(true)

export default workProofStore
