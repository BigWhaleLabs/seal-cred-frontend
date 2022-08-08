import { SCERC721Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import ERC721Ledger from 'models/ERC721Ledger'
import getDataFromEvents from 'helpers/contracts/getDataFromEvents'

export default async function (ledger: SCERC721Ledger): Promise<ERC721Ledger> {
  const eventsFilter = ledger.filters.CreateDerivative()
  const events = await ledger.queryFilter(eventsFilter)
  const result = getDataFromEvents(events)
  return result
}
