import {
  ERC721__factory,
  SCERC721Derivative__factory,
  SealCredLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import defaultProvider from 'helpers/defaultProvider'
import getAllEvents from 'helpers/getAllEvents'

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
  const { events, deleteTopic } = await getAllEvents(sealCredLedger)

  const ledger = {} as Ledger
  const addressToMerkle: { [address: string]: string } = {}

  for (const event of events) {
    const {
      args: { tokenAddress, merkleRoot },
      topic,
    } = sealCredLedger.interface.parseLog(event)

    if (topic === deleteTopic) {
      delete addressToMerkle[tokenAddress]
      continue
    }
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
