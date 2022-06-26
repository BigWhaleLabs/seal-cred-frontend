import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'

export default abstract class BaseProof implements Proof {
  result?: ProofResult

  abstract get key(): string
  abstract toJSON(): object
  abstract equal(proof: BaseProof): boolean
}
