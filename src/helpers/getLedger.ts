import Ledger from 'models/Ledger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import sealCred from 'helpers/sealCred'

export default async function (): Promise<Ledger> {
  const eventsFilter = sealCred.filters.CreateDerivativeContract()
  const events = await sealCred.queryFilter(eventsFilter)
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
  console.log('got ledger with size', Object.keys(result).length)
  return result
}
