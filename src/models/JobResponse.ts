import ProofResponse from 'models/ProofResponse'
import ProofStatus from 'models/ProofStatus'

export default interface JobResponse {
  _id: string
  status: ProofStatus
  result?: ProofResponse
}
