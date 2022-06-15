import ProofResult from 'models/ProofResult'

export default interface Proof {
  contract: string
  account: string
  result?: ProofResult
}
