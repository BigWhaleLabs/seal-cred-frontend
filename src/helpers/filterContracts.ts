import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import ownsToken from 'helpers/ownsToken'

export default async function filterContracts<
  T extends ERC721 | SCERC721Derivative
>(contracts: T[], account: string) {
  const sortedContracts: { minted: T[]; unminted: T[] } = {
    minted: [],
    unminted: [],
  }

  await Promise.all(
    contracts.map(async (contract) => {
      const accountOwnsToken = await ownsToken(contract, account)
      return accountOwnsToken
        ? sortedContracts.minted.push(contract)
        : sortedContracts.unminted.push(contract)
    })
  )

  return sortedContracts
}
