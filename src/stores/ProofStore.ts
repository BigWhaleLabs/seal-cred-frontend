import { ProofCheck, checkJobStatus } from 'helpers/callProof'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import axios from 'axios'

class ProofStore extends PersistableStore {
  jobs: { [id: string]: ProofCheck } = {}

  addNewJob(id: string, job: ProofCheck) {
    this.jobs[id] = job
  }

  removeJob(id: string) {
    delete this.jobs[id]
  }

  async checkJobStatus(id: string) {
    try {
      return await checkJobStatus(id)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message)
        throw error.message
      } else {
        throw error
      }
    }
  }
}

export default proxy(new ProofStore()).makePersistent(false)
