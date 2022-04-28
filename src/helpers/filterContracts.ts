import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import ownsToken from 'helpers/ownsToken'

export default async function filterContracts<
  T extends ERC721 | SCERC721Derivative
>(contracts: T[], account: string) {
  return (
    await Promise.all(
      contracts.map(async (contract) => {
        const accountOwnsToken = await ownsToken(contract, account)
        return accountOwnsToken ? contract : undefined
      })
    )
  ).filter((v) => !!v) as T[]
}
