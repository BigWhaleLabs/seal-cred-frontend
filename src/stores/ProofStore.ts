import { checkJobStatus } from 'helpers/callProof'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResponse from 'models/ProofResponse'

// TODO: Should have the "generate" function, and "proofsInProgress", "proofsReady" properties
// TODO: "generate" should take derivative contract address as an argument; should fetch the list of owners from StreetCredStore and the account from WalletStore, then it should call the "generate" function of zk-proof-generator, add the proof to "proofsInProgress"
// TODO: "checkJobs" should be called every 5 seconds and update the jobs in "proofsInProgress", moving them to "proofsReady" if they are done
// TODO: "proofsInProgress" and "proofsReady" should be persisted

interface JobObject {
  _id: string
  status: string
  position?: number
  proof?: ProofResponse
}
type TaskJob = { [badge: string]: JobObject }

class ProofStore extends PersistableStore {
  tasks: TaskJob = {}

  startIntervalChecker() {
    setInterval(async () => {
      await this.checkTasks()
    }, 5000)
  }

  async checkTasks() {
    const fetchByKeys = Object.keys(this.tasks).map((key) =>
      this.requestTaskData(this.tasks[key])
    )
    if (!fetchByKeys.length) return
    await Promise.all(fetchByKeys).then((results) => {
      for (const badge in this.tasks) {
        const data = results.find((r) => r?._id === this.tasks[badge]._id)
        !data ? delete this.tasks[badge] : (this.tasks[badge] = data)
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

export default proxy(new ProofStore()).makePersistent(false)
