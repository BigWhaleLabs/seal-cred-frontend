import { StreetCredLedger } from '@big-whale-labs/street-cred-ledger-contract'
import ExtendedERC721Contract from 'helpers/ExtendedERC721Contract'
import Ledger from 'types/Ledger'

export default async function getLedger(streetCredLedger: StreetCredLedger) {
  const eventsFilter = streetCredLedger.filters.SetMerkleRoot()
  const events = await streetCredLedger.queryFilter(eventsFilter)
  const ledger = new Map() as Ledger
  for (const event of events) {
    const { tokenAddress } = event.args
    ledger.set(
      tokenAddress,
      new ExtendedERC721Contract(tokenAddress, event.args.merkleRoot)
    )
  }
  return ledger
}
