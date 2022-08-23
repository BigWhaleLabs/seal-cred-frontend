import { proxyWithComputed } from 'valtio/utils'
import SCLedger from 'models/SCLedger'
import dataShapeObject from 'helpers/contracts/dataShapeObject'
import getLedger from 'helpers/contracts/getLedger'
import ledgerContracts from 'helpers/contracts/ledgerContracts'

interface SealCredStoreType {
  ledgers: Promise<{
    [ledger: string]: SCLedger
  }>
  ledgerToDerivativeContracts: {
    [ledger: string]: string[]
  }
}

interface SealCredStoreTypeComputed {
  allDerivativeContracts: readonly string[]
}

const SealCredStore = proxyWithComputed<
  SealCredStoreType,
  SealCredStoreTypeComputed
>(
  {
    ledgers: Promise.resolve({}),
    ledgerToDerivativeContracts: dataShapeObject(() => []),
  },
  {
    allDerivativeContracts: (state) =>
      Object.values(state.ledgerToDerivativeContracts).reduce(
        (allContracts, contracts) => allContracts.concat(contracts),
        []
      ),
  }
)

SealCredStore.ledgers = Promise.all(
  Object.keys(ledgerContracts).map((name) => ({
    name,
    ledger: getLedger(ledgerContracts[name]),
  }))
).then(async (records) => {
  const result = {} as {
    [ledger: string]: SCLedger
  }

  for (const { name, ledger } of Object.values(records)) {
    result[name] = await ledger
    SealCredStore.ledgerToDerivativeContracts[name] = Object.values(
      result[name]
    ).map(({ derivative }) => derivative)
  }

  return result
})

for (const [name, ledgerContract] of Object.entries(ledgerContracts)) {
  ledgerContract.on(
    ledgerContract.filters.CreateDerivative(),
    async (original, derivative) => {
      const ledger = await SealCredStore.ledgers

      ledger[name][original] = {
        original,
        derivative,
      }
    }
  )
  ledgerContract.on(
    ledgerContract.filters.DeleteOriginal(),
    async (original) => {
      const ledger = await SealCredStore.ledgers
      delete ledger[name][original]
    }
  )
}

export default SealCredStore
