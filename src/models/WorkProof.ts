import ProofResult from 'models/ProofResult'

export default interface WorkProof {
  id: string
  domain: string
  result?: ProofResult
}
