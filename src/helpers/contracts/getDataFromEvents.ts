import { CreateDerivativeEvent } from '@big-whale-labs/seal-cred-ledger-contract/dist/typechain/contracts/base/Ledger'
import SCLedger from 'models/SCLedger'
import getLedgerRecord from 'helpers/contracts/getLedgerRecord'

export default function (events: CreateDerivativeEvent[]) {
  return events.reduce((prev, { args: { original, derivative } }) => {
    return {
      ...prev,
      [original]: getLedgerRecord(original, derivative),
    }
  }, {} as SCLedger)
}
