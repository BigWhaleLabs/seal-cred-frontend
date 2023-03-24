import { CreateDerivativeEvent } from '@big-whale-labs/seal-cred-ledger-contract/dist/typechain/contracts/base/Ledger'
import SCLedger from 'models/SCLedger'

export default function (events: CreateDerivativeEvent[]) {
  return events.reduce((prev, { args: { derivative, original } }) => {
    return {
      ...prev,
      [original]: derivative.toLowerCase(),
    }
  }, {} as SCLedger)
}
