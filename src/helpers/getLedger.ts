import { StreetCredLedger } from '@big-whale-labs/street-cred-ledger-contract'
import Ledger from 'types/Ledger'

export default async function getLedger(streetCredLedger: StreetCredLedger) {
  const eventsFilter = await streetCredLedger.filters.SetMerkleRoot()
  const events = await streetCredLedger.queryFilter(eventsFilter)
  const ledger = {} as Ledger
  for (const event of events) {
    ledger[event.args.tokenAddress] = event.args.merkleRoot
  }
  return ledger
}
