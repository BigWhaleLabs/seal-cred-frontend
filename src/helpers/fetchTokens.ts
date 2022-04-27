import Ledger from 'types/Ledger'

function getDerivativeContracts(ledger: Ledger, account?: string) {
  if (!account) return []

  return Promise.all(
    Array.from(ledger.values())
      .map(async ({ derivativeContract }) => {
        return Number(await derivativeContract.balanceOf(account))
          ? derivativeContract
          : undefined
      })
      .filter((contract) => !!contract)
  )
}

function getOriginalContracts(ledger: Ledger, account?: string) {
  if (!account) return []

  return Promise.all(
    Array.from(ledger.values())
      .map(async ({ originalContract }) => {
        return Number(await originalContract.balanceOf(account))
          ? originalContract
          : undefined
      })
      .filter((contract) => !!contract)
  )
}

export { getOriginalContracts, getDerivativeContracts }
