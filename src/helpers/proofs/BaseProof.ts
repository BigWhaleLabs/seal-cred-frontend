import { DataKeys } from 'models/DataKeys'
import Proof from 'models/Proof'
import ProofResult from 'models/ProofResult'
import data from 'data'

export default class BaseProof implements Proof {
  account?: string
  result: ProofResult
  origin: string
  dataType: DataKeys

  get type() {
    return data[this.dataType].badgeType
  }

  constructor(
    origin: string,
    dataType: DataKeys,
    result: ProofResult,
    account?: string
  ) {
    this.origin = origin
    this.account = account
    this.dataType = dataType
    this.result = result
  }

  equal(proof: BaseProof): boolean {
    return (
      this.origin === proof.origin &&
      this.account === proof.account &&
      this.dataType === proof.dataType
    )
  }

  static fromJSON({
    origin,
    account,
    result,
    dataType,
  }: {
    account?: string
    origin: string
    result: ProofResult
    dataType: DataKeys
  }) {
    return new BaseProof(origin, dataType, result, account)
  }

  toJSON() {
    return {
      contract: this.origin,
      account: this.account,
      result: this.result,
      dataType: this.dataType,
    }
  }
}
