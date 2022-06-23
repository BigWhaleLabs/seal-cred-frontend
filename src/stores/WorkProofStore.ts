import { getPublicKey } from 'helpers/attestor'
import { proxy } from 'valtio'
import { utils } from 'ethers'
import PersistableStore from 'stores/persistence/PersistableStore'
import WorkProof from 'models/WorkProof'
import checkNavigator from 'helpers/checkNavigator'
import handleError from 'helpers/handleError'
import unpackSignature from 'helpers/unpackSignature'

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
      const { x, y } = await getPublicKey()
      const [packedSignature, nullifier] = secret.split('-')

      const maxDomainLength = 90
      const domainBytes = padZeroesOnRightUint8(
        utils.toUtf8Bytes(domain),
        maxDomainLength
      )

      // Get the message in bytes and its hash
      const messageUInt8 = utils.concat([
        domainBytes,
        utils.toUtf8Bytes(nullifier),
      ])

      // Generate input
      const privateInput = await unpackSignature(messageUInt8, packedSignature)
      const input = {
        message: Array.from(messageUInt8),
        domain: Array.from(domainBytes),
        pubKeyX: x,
        pubKeyY: y,
        ...privateInput,
      }

      // Check navigator availability
      checkNavigator()

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
