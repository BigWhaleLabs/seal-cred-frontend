import { Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import SCLedger from 'models/SCLedger'
import getDataFromEvents from 'helpers/contracts/getDataFromEvents'

export default async function (ledger: Ledger): Promise<SCLedger> {
  const eventsFilter = ledger.filters.CreateDerivative()
  const events = await ledger.queryFilter(eventsFilter)
  const result = getDataFromEvents(events)
  return result
}
