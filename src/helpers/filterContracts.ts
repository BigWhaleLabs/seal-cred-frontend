import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import SortedContracts from 'types/SortedContracts'
import ownsToken from 'helpers/ownsToken'

export default async function filterContracts<
  T extends ERC721 | SCERC721Derivative
>(contracts: T[], account?: string) {
  const sortedContracts: SortedContracts<T> = {
    owned: [],
    unowned: [],
  }

  await Promise.all(
    contracts.map(async (contract) => {
      const accountOwnsToken = account
        ? await ownsToken(contract, account)
        : false
      return accountOwnsToken
        ? sortedContracts.owned.push(contract)
        : sortedContracts.unowned.push(contract)
    })
  )

  return sortedContracts
}
