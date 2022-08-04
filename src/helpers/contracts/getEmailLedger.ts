import { SCEmailLedger } from '@big-whale-labs/seal-cred-ledger-contract'
import EmailLedger from 'models/EmailLedger'
import getDataFromEvents from 'helpers/contracts/getDataFromEvents'

export default async function (ledger: SCEmailLedger): Promise<EmailLedger> {
  const eventsFilter = ledger.filters.CreateDerivative()
  const events = await ledger.queryFilter(eventsFilter)
  const result = getDataFromEvents(events)
  return result
}
