import { SealCredERC721Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getERC721LedgerRecord from 'helpers/getERC721LedgerRecord'

export default async function (ledger: SealCredERC721Ledger): Promise<Ledger> {
  const eventsFilter = ledger.filters.CreateDerivativeContract()
  const events = await ledger.queryFilter(eventsFilter)
  const result = events.reduce(
    (prev, { args: { originalContract, derivativeContract } }) => {
      return {
        ...prev,
        [originalContract]: getERC721LedgerRecord(
          originalContract,
          derivativeContract
        ),
      }
    },
    {}
  )
  return result
}
