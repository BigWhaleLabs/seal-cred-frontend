import ProofResponse from 'models/ProofResponse'
import ProofStatus from 'models/ProofStatus'

type Proof = {
  id: string
  contract: string
  account: string
  status: ProofStatus
  position?: number
  result?: ProofResponse
}

export default Proof
