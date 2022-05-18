import ProofResponse from 'models/ProofResponse'
import ProofStatus from 'models/ProofStatus'

export default interface Proof {
  id: string
  contract: string
  account: string
  status: ProofStatus
  position?: number
  result?: ProofResponse
}

export const ProofOrdering = {
  [ProofStatus.completed]: 0,
  [ProofStatus.running]: 1,
  [ProofStatus.scheduled]: 2,
  [ProofStatus.cancelled]: 3,
  [ProofStatus.failed]: 4,
}
