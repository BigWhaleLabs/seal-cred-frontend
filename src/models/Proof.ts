import { DataKeys } from 'models/DataKeys'
import ProofResult from 'models/ProofResult'

export default interface Proof {
  account?: string
  origin: string
  result: ProofResult
  dataType: DataKeys
}
