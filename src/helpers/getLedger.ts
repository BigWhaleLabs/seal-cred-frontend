import {
  ERC721__factory,
  SCERC721Derivative__factory,
  SealCredLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { QUERY_BLOCK_LIMIT } from '@big-whale-labs/constants'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import defaultProvider from 'helpers/defaultProvider'

export async function getLedgerRecord(
  sealCredLedger: SealCredLedger,
  tokenAddress: string,
  merkleRoot: string
) {
  return {
    merkleRoot,
    originalContract: ERC721__factory.connect(tokenAddress, defaultProvider),
    derivativeContract: SCERC721Derivative__factory.connect(
      await sealCredLedger.getDerivativeAddress(tokenAddress),
      defaultProvider
    ),
  } as LedgerRecord
}

export default async function (sealCredLedger: SealCredLedger) {
  const eventsFilter = sealCredLedger.filters.SetMerkleRoot()
  const events = await sealCredLedger.queryFilter(
    eventsFilter,
    QUERY_BLOCK_LIMIT
  )
  const ledger = {} as Ledger
  const addressToMerkle: { [address: string]: string } = {}

  for (const event of events) {
    const { tokenAddress, merkleRoot } = event.args
    addressToMerkle[tokenAddress] = merkleRoot
  }

  for (const tokenAddress in addressToMerkle) {
    ledger[tokenAddress] = await getLedgerRecord(
      sealCredLedger,
      tokenAddress,
      addressToMerkle[tokenAddress]
    )
  }
  return ledger
}
