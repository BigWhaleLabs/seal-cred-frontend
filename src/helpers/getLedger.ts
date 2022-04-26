import {
  ERC721,
  ERC721__factory,
  StreetCredLedger,
} from '@big-whale-labs/street-cred-ledger-contract'
import { defaultProvider } from 'helpers/defaultProvider'
import ExtendedERC721Contract from 'helpers/ExtendedERC721Contract'

import Ledger from 'types/Ledger'

export async function getDerivativeAddresses(
  streetCredLedger: StreetCredLedger
) {
  const ledger = getLedger(streetCredLedger)
  const addresses = await Promise.all(
    Object.keys(ledger).map((address) =>
      streetCredLedger.getDerivativeAddress(address)
    )
  )
  const ledgerValues = addresses.map((address) => [
    address,
    ERC721__factory.connect(address, defaultProvider),
  ])

  const addressToContract = new Map<string, ERC721>(ledgerValues)

  return
}

export async function getLedger(streetCredLedger: StreetCredLedger) {
  const eventsFilter = streetCredLedger.filters.SetMerkleRoot()
  const events = await streetCredLedger.queryFilter(eventsFilter)
  const ledger = {} as Ledger
  for (const event of events) {
    const tokenAddress = event.args.tokenAddress
    ledger[tokenAddress] = new ExtendedERC721Contract(
      tokenAddress,
      event.args.merkleRoot
    )
  }
  return ledger
}
