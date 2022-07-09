import { SCERC721Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import ERC721Ledger from 'models/ERC721Ledger'
import getERC721LedgerRecord from 'helpers/contracts/getERC721LedgerRecord'

export default async function (ledger: SCERC721Ledger): Promise<ERC721Ledger> {
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
