import { SCEmailLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import EmailLedger from 'models/EmailLedger'
import getLedgerRecord from 'helpers/contracts/getLedgerRecord'

export default async function (ledger: SCEmailLedger): Promise<EmailLedger> {
  const eventsFilter = ledger.filters.CreateDerivative()
  const events = await ledger.queryFilter(eventsFilter)
  const result = events.reduce((prev, { args: { original, derivative } }) => {
    return {
      ...prev,
      [original]: getLedgerRecord(original, derivative),
    }
  }, {})
  return result
}
