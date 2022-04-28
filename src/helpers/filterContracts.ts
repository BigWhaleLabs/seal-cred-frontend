import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import SortedContracts from 'types/SortedContracts'
import isAddressOwner from 'helpers/isAddressOwner'

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
        ? await isAddressOwner(contract, account)
        : false
      return accountOwnsToken
        ? sortedContracts.owned.push(contract)
        : sortedContracts.unowned.push(contract)
    })
  )

  return sortedContracts
}
