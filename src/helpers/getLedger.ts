import {
  SealCredERC721Ledger,
  SealCredEmailLedger,
} from '@big-whale-labs/seal-cred-ledger-contract'
import Ledger from 'models/Ledger'
import getLedgerRecord from 'helpers/getLedgerRecord'

export default async function (
  ledger: SealCredERC721Ledger | SealCredEmailLedger
): Promise<Ledger> {
  const eventsFilter = ledger.filters.CreateDerivativeContract()
  const events = await ledger.queryFilter(eventsFilter)
  const result = events.reduce(
    (prev, { args: { originalContract, derivativeContract } }) => {
      return {
        ...prev,
        [originalContract]: getLedgerRecord(
          originalContract,
          derivativeContract
        ),
      }
    },
    {}
  )
  return result
}
