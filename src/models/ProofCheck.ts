import JobResponse from 'models/JobResponse'
import ProofStatus from 'models/ProofStatus'

export default interface ProofCheck {
  job: JobResponse
  status: ProofStatus
  position?: number
}
