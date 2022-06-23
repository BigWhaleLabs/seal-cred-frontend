import { SealCredEmailLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getLedgerRecord from 'helpers/getLedgerRecord'

export default async function (ledger: SealCredEmailLedger): Promise<Ledger> {
  const eventsFilter = ledger.filters.CreateDerivativeContract()
  const events = await ledger.queryFilter(eventsFilter)
  const result = events.reduce(
    (prev, { args: { email, derivativeContract } }) => {
      return {
        ...prev,
        [email]: getLedgerRecord(email, derivativeContract),
      }
    },
    {}
  )
  return result
}
