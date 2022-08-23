import { BadgeSourceType } from 'data'
import { DataKeys } from 'models/DataKeys'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'

export default abstract class BaseProof implements Proof {
  result?: ProofResult

  abstract get type(): BadgeSourceType
  abstract get dataType(): DataKeys
  abstract get origin(): string
  abstract toJSON(): object
  abstract equal(proof: BaseProof): boolean
}
