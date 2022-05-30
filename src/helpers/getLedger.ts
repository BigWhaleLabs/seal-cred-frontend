import {
  ERC721__factory,
  SCERC721Derivative__factory,
  SealCredLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { getAddressesToMerkleRoot } from '@big-whale-labs/frontend-utils'
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
  const addressToMerkle = await getAddressesToMerkleRoot(sealCredLedger)
  const ledger = {} as Ledger

  for (const tokenAddress in addressToMerkle) {
    ledger[tokenAddress] = await getLedgerRecord(
      sealCredLedger,
      tokenAddress,
      addressToMerkle[tokenAddress]
    )
  }
  return ledger
}
