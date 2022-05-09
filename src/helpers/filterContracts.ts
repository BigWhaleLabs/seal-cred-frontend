import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'
import SortedContracts from 'models/SortedContracts'
import isAddressOwner from 'helpers/isAddressOwner'

export default async function filterContracts<
  T extends ERC721 | SCERC721Derivative
>(contracts: T[], account: string) {
  const sortedContracts: SortedContracts<T> = {
    owned: [],
    unowned: [],
  }

  await Promise.all(
    contracts.map(async (contract) => {
      const accountOwnsToken = await isAddressOwner(contract, account)
      return accountOwnsToken
        ? sortedContracts.owned.push(contract)
        : sortedContracts.unowned.push(contract)
    })
  )

  return sortedContracts
}
