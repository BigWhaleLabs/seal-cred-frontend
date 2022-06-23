import { SealCredEmailLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import EmailLedger from 'models/EmailLedger'
import getEmailLedgerRecord from 'helpers/getEmailLedgerRecord'

export default async function (
  ledger: SealCredEmailLedger
): Promise<EmailLedger> {
  const eventsFilter = ledger.filters.CreateDerivativeContract()
  const events = await ledger.queryFilter(eventsFilter)
  const result = events.reduce(
    (prev, { args: { email, derivativeContract } }) => {
      return {
        ...prev,
        [email]: getEmailLedgerRecord(derivativeContract),
      }
    },
    {}
  )
  return result
}
