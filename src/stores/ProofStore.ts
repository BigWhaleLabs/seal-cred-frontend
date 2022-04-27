import {
  ProofStatus,
  checkJobStatus,
  scheduleProofGeneration,
} from 'helpers/callProof'
import { proxy } from 'valtio'
import EcdsaInput from 'models/EcdsaInput'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResponse from 'models/ProofResponse'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'
import createTreeProof from 'helpers/createTreeProof'

interface JobObject {
  _id: string
  status: ProofStatus
  position?: number
  proof?: ProofResponse
}

class ProofStore extends PersistableStore {
  tasks: Map<string, JobObject> = new Map()
  proofsInProgress: Map<string, JobObject> = new Map()
  proofsReady: Map<string, JobObject> = new Map()

  async generate(
    derivativeContractAddress: string,
    ecdsaInput: EcdsaInput | undefined
  ) {
    const account = WalletStore.account
    if (!account) throw new Error('No account found')

    const ledger = await StreetCredStore.ledger
    const contract = ledger.get(derivativeContractAddress)
    if (!contract) throw new Error('Derivative contract not found')

    const isOwner = contract.isAddressOwner(account)
    if (!isOwner) throw new Error('Account is not owner of contract')

    const owners = await contract.getMapOfOwners()
    const addresses = Array.from(owners.keys())

    const tokenId = owners.get(account)
    if (!tokenId) throw new Error('Account is not owner of contract')

    const treeProof = createTreeProof(0, addresses)
    const result = await scheduleProofGeneration(treeProof, ecdsaInput)

    this.tasks.set(result._id, result)
    this.proofsInProgress.set(result._id, result)

    return result
  }

  async checkTasks() {
    const items = Array.from(this.tasks.values()).filter((task) =>
      [ProofStatus.scheduled, ProofStatus.running].includes(task.status)
    )
    const fetchByKeys = items.map(this.requestTaskData)
    if (!fetchByKeys.length) return
    await Promise.all(fetchByKeys).then((results) => {
      for (const [badge, job] of this.tasks) {
        const data = results.find((r) => r?._id === job._id)
        if (!data) {
          this.tasks.delete(badge)
        } else {
          this.tasks.set(badge, data)
          if (data.status === ProofStatus.completed) {
            this.proofsReady.set(badge, data)
            this.proofsInProgress.delete(badge)
          }
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

  reviver = (key: string, value: unknown) => {
    switch (key) {
      case 'proofsInProgress': {
        return new Map(value as [string, JobObject][])
      }
      case 'proofsReady': {
        return new Map(value as [string, JobObject][])
      }
      case 'tasks': {
        return new Map(value as [string, JobObject][])
      }
      default:
        return value
    }
  }

  replacer = (key: string, value: unknown) => {
    switch (key) {
      case 'proofsInProgress': {
        return Array.from(value as Map<string, JobObject>)
      }
      case 'proofsReady': {
        return Array.from(value as Map<string, JobObject>)
      }
      case 'tasks': {
        return Array.from(value as Map<string, JobObject>)
      }
      default:
        return value
    }
  }
}

const proofStore = proxy(new ProofStore()).makePersistent(true)

setInterval(async () => {
  await proofStore.checkTasks()
}, 5000)

export default proofStore
