import {
  ProofStatus,
  checkJobStatus,
  scheduleProofGeneration,
} from 'helpers/callProof'
import { handleError } from 'helpers/handleError'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResponse from 'models/ProofResponse'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import createEcdsaInput from 'helpers/createEcdsaInput'
import createTreeProof from 'helpers/createTreeProof'
import getMapOfOwners from 'helpers/getMapOfOwners'
import isAddressOwner from 'helpers/isAddressOwner'

interface JobObject {
  _id: string
  status: ProofStatus
  position?: number
  proof?: ProofResponse
}

type ProofRecord = JobObject & {
  originalContractAddress: string
}

class ProofStore extends PersistableStore {
  proofsInProgress: { [badge: string]: ProofRecord } = {}
  proofsReady: { [badge: string]: ProofRecord } = {}

  async generate(address: string) {
    try {
      const account = WalletStore.account
      if (!account) throw new Error('No account found')

      const ledger = await StreetCredStore.ledger
      const record = ledger[address]

      if (!record || !record.originalContract)
        throw new Error('Derivative contract not found')

      const { originalContract } = record

      const isOwner = isAddressOwner(originalContract, account)
      if (!isOwner) throw new Error('Account is not owner of contract')

      const owners = await getMapOfOwners(originalContract)
      const addresses = Array.from(owners.values())

      const tokenId = addresses.indexOf(account)
      if (tokenId < 0) throw new Error('Account is not owner of contract')

      const signature = await WalletStore.signMessage(address)
      if (!signature) throw new Error('Signature is not found')

      const treeProof = createTreeProof(tokenId, addresses)
      const ecdsaInput = createEcdsaInput(signature)
      const result = await scheduleProofGeneration(treeProof, ecdsaInput)

      this.proofsInProgress[address] = {
        ...result,
        originalContractAddress: address,
      }

      return result
    } catch (e) {
      handleError(new Error('Proof generation failed'))
      return
    }
  }

  async checkTasks() {
    const fetchByKeys = Object.values(this.proofsInProgress).map(
      this.requestTaskData
    )
    if (!fetchByKeys.length) return
    await Promise.all(fetchByKeys).then((results) => {
      for (const [badge, job] of Object.entries(this.proofsInProgress)) {
        const data = results.find((r) => r?._id === job._id)
        if (!data) {
          delete this.proofsInProgress[badge]
        } else {
          this.proofsInProgress[badge] = {
            ...this.proofsInProgress[badge],
            ...data,
          }
          if (
            [ProofStatus.scheduled, ProofStatus.running].includes(data.status)
          )
            continue
          if (data.status === ProofStatus.completed) {
            this.proofsReady[badge] = this.proofsInProgress[badge]
          }
          delete this.proofsInProgress[badge]
          if (data.status === ProofStatus.cancelled)
            handleError(new Error('Proof generation cancelled'))
          if (data.status === ProofStatus.failed)
            handleError(new Error('Proof generation failed'))
        }
      }
    })
  }

  async requestTaskData(task: JobObject) {
    try {
      const { position, job } = await checkJobStatus(task._id)
      return !job
        ? undefined
        : {
            ...task,
            status: job.status,
            proof: job.proof,
            position,
          }
    } catch (e) {
      console.log('Error: ', e)
      return
    }
  }
}

const proofStore = proxy(new ProofStore()).makePersistent(true)

setInterval(async () => {
  await proofStore.checkTasks()
}, 5000)

export default proofStore
