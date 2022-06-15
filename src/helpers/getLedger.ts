import {
  ERC721__factory,
  SCERC721Derivative__factory,
  SealCredLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import defaultProvider from 'helpers/defaultProvider'

export async function getLedgerRecord(
  sealCredLedger: SealCredLedger,
  originalContract: string
) {
  return {
    originalContract: ERC721__factory.connect(
      originalContract,
      defaultProvider
    ),
    derivativeContract: SCERC721Derivative__factory.connect(
      await sealCredLedger.getDerivativeContract(originalContract),
      defaultProvider
    ),
  } as LedgerRecord
}

export default async function (sealCredLedger: SealCredLedger) {
  const eventsFilter = sealCredLedger.filters.CreateDerivativeContract()
  const events = await sealCredLedger.queryFilter(eventsFilter)
  const ledger = {} as Ledger
  const addressToDerivative: { [address: string]: string } = {}

  for (const event of events) {
    const { originalContract, derivativeContract } = event.args
    addressToDerivative[originalContract] = derivativeContract
  }

  for (const tokenAddress in addressToDerivative) {
    ledger[tokenAddress] = await getLedgerRecord(sealCredLedger, tokenAddress)
  }
  return ledger
}
