import ProofStatus from 'models/ProofStatus'

export default interface Proof {
  id: string
  contract: string
  account: string
  status: ProofStatus
}

export const ProofOrdering = {
  [ProofStatus.completed]: 0,
  [ProofStatus.running]: 1,
}
