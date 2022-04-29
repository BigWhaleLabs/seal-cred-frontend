import JobResponse from 'models/JobResponse'

export default interface ProofCheck {
  job: JobResponse
  position?: number
}
