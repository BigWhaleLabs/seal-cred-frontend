import {
  ERC721__factory,
  SCERC721Derivative__factory,
  StreetCredLedger,
} from '@big-whale-labs/street-cred-ledger-contract'
import Ledger from 'types/Ledger'
import defaultProvider from 'helpers/defaultProvider'

export async function getLedgerRecord(
  streetCredLedger: StreetCredLedger,
  tokenAddress: string,
  merkleRoot: string
) {
  return {
    merkleRoot,
    originalContract: ERC721__factory.connect(tokenAddress, defaultProvider),
    derivativeContract: SCERC721Derivative__factory.connect(
      await streetCredLedger.getDerivativeAddress(tokenAddress),
      defaultProvider
    ),
  }
}

export default async function getLedger(streetCredLedger: StreetCredLedger) {
  const eventsFilter = streetCredLedger.filters.SetMerkleRoot()
  const events = await streetCredLedger.queryFilter(eventsFilter)
  const ledger = {} as Ledger
  for (const event of events) {
    const { tokenAddress } = event.args
    const merkleRoot = event.args.merkleRoot
    ledger[tokenAddress] = await getLedgerRecord(
      streetCredLedger,
      tokenAddress,
      merkleRoot
    )
  }
  return ledger
}
