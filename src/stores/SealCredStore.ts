import { DataKeys } from 'models/DataKeys'
import { proxyWithComputed } from 'valtio/utils'
import SCLedger from 'models/SCLedger'
import data from 'data'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import getLedger from 'helpers/contracts/getLedger'
import ledgerContracts from 'helpers/contracts/ledgerContracts'

const SealCredStore = proxyWithComputed(
  {
    ledgers: Promise.resolve(
      {} as {
        [ledger in DataKeys]: SCLedger
      }
    ),
    ledgerToDerivativeAddresses: dataShapeObject(() => [] as string[]),
  },
  {
    allDerivativeAddresses: (state) =>
      Object.values(state.ledgerToDerivativeAddresses).reduce(
        (allContracts, contracts) => allContracts.concat(contracts),
        []
      ),
  }
)

SealCredStore.ledgers = Promise.all(
  (Object.keys(ledgerContracts) as DataKeys[]).map((name) => ({
    name,
    ledger: getLedger(ledgerContracts[name]),
  }))
).then(async (records) => {
  const result = {} as {
    [ledger in DataKeys]: SCLedger
  }

  for (const { name, ledger } of Object.values(records)) {
    result[name] = await ledger
    SealCredStore.ledgerToDerivativeAddresses[name] = Object.values(
      result[name]
    )
  }

  return result
})

for (const name of Object.keys(data) as DataKeys[]) {
  const ledgerContract = ledgerContracts[name]
  ledgerContract.on(
    ledgerContract.filters.CreateDerivative(),
    async (original, derivative) => {
      const ledgers = await SealCredStore.ledgers

      ledgers[name][original] = derivative
    }
  )
  ledgerContract.on(
    ledgerContract.filters.DeleteOriginal(),
    async (original) => {
      const ledgers = await SealCredStore.ledgers
      delete ledgers[name][original]
    }
  )
}

export default SealCredStore
