import { ExternalSCERC721Ledger } from '@big-whale-labs/seal-cred-ledger-contract'
import ERC721Ledger from 'models/ERC721Ledger'
import getLedgerRecord from 'helpers/contracts/getLedgerRecord'

export default async function (
  ledger: ExternalSCERC721Ledger
): Promise<ERC721Ledger> {
  const eventsFilter = ledger.filters.CreateDerivative()
  const events = await ledger.queryFilter(eventsFilter)
  const result = events.reduce((prev, { args: { original, derivative } }) => {
    return {
      ...prev,
      [original]: getLedgerRecord(original, derivative),
    }
  }, {})
  return result
}
