import { BadgeSourceType } from 'data'
import { DataKey } from 'models/DataKey'
import ProofResult from 'models/ProofResult'

export default interface Proof {
  account?: string
  original: string
  result: ProofResult
  dataType: DataKey
  badgeType: BadgeSourceType
}
