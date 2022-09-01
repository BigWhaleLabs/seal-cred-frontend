import { DataKey } from 'models/DataKey'
import { dataKeys } from 'helpers/contracts/dataShapeObject'
import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import SCLedger from 'models/SCLedger'
import getLedger from 'helpers/contracts/getLedger'
import ledgerContracts from 'helpers/contracts/ledgerContracts'

const state = proxy({
  ledgers: Promise.all(
    (Object.keys(ledgerContracts) as DataKey[]).map((name) => ({
      name,
      ledger: getLedger(ledgerContracts[name]),
    }))
  ).then(async (records) => {
    const result = {} as {
      [ledger in DataKey]: SCLedger
    }

    for (const { name, ledger } of Object.values(records)) {
      result[name] = await ledger
    }

    return result
  }),
})

const SealCredStore = derive(
  {
    allDerivativeAddresses: async (get) =>
      Object.values(await get(state).ledgers).reduce(
        (combined, ledger) => [...combined, ...Object.values(ledger)],
        [] as string[]
      ),
  },
  {
    proxy: state,
  }
)

for (const name of dataKeys) {
  const ledgerContract = ledgerContracts[name]
  ledgerContract.on(
    ledgerContract.filters.CreateDerivative(),
    async (original, derivative) => {
      const ledgers = await state.ledgers
      ledgers[name][original] = derivative
    }
  )
  ledgerContract.on(
    ledgerContract.filters.DeleteOriginal(),
    async (original) => {
      const ledgers = await state.ledgers
      delete ledgers[name][original]
    }
  )
}

export default SealCredStore
