import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'
import data from 'data'

export default abstract class BaseProof implements Proof {
  result?: ProofResult

  abstract get dataType(): keyof typeof data
  abstract get key(): string
  abstract toJSON(): object
  abstract equal(proof: BaseProof): boolean
}
