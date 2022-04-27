import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
import Ledger from 'types/Ledger'

async function isTokenOwner(contract: ERC721, account: string) {
  return !!Number(await contract.balanceOf(account))
}

function getFilteredContracts<T extends ERC721>(
  allContracts: T[],
  account: string,
  minted = true
) {
  try {
    return Promise.all(
      allContracts.filter((contract) =>
        minted
          ? isTokenOwner(contract, account)
          : !isTokenOwner(contract, account)
      )
    )
  } catch (error) {
    return Promise.all([])
  }
}

export function getDerivativeContracts(ledger: Ledger, account?: string) {
  if (!account) return Promise.resolve([])
  const derivativeContracts = Object.values(ledger).map(
    ({ derivativeContract }) => derivativeContract
  )

  return getFilteredContracts(derivativeContracts, account)
}

export function getOriginalContracts(ledger: Ledger, account?: string) {
  if (!account) return Promise.resolve([])
  const originalContracts = Object.values(ledger).map(
    ({ originalContract }) => originalContract
  )

  return getFilteredContracts(originalContracts, account)
}
