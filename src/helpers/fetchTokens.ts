import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import Ledger from 'types/Ledger'

async function isTokenOwner(contract: ERC721, account: string) {
  return !!Number(await contract.balanceOf(account))
}

function getFilteredContracts(
  allContracts: (ERC721 | SCERC721Derivative)[],
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
  const derivativeContracts: SCERC721Derivative[] = []

  ledger.forEach(({ derivativeContract }) =>
    derivativeContracts.push(derivativeContract)
  )

  return getFilteredContracts(derivativeContracts, account) as Promise<
    SCERC721Derivative[]
  >
}

export function getOriginalContracts(ledger: Ledger, account?: string) {
  if (!account) return Promise.resolve([])
  const originalContracts: ERC721[] = []

  ledger.forEach(({ originalContract }) =>
    originalContracts.push(originalContract)
  )

  return getFilteredContracts(originalContracts, account)
}
