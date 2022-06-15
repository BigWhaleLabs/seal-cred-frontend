import ProofResult from 'models/ProofResult'

export default interface Proof {
  id: string
  contract: string
  account: string
  result?: ProofResult
}
