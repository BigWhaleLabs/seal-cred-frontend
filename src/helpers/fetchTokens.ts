import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import Ledger from 'types/Ledger'

const getMintedContracts = async (
  allContracts: (ERC721 | SCERC721Derivative)[],
  account: string
) => {
  try {
    return Promise.all(
      await allContracts.filter(async (contract) =>
        Number(await contract.balanceOf(account))
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

  return getMintedContracts(derivativeContracts, account) as Promise<
    SCERC721Derivative[]
  >
}

export function getOriginalContracts(ledger: Ledger, account?: string) {
  if (!account) return Promise.resolve([])
  const originalContracts: ERC721[] = []

  ledger.forEach(({ originalContract }) =>
    originalContracts.push(originalContract)
  )

  return getMintedContracts(originalContracts, account)
}
