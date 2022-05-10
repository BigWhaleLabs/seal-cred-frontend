import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'

export default async function isAddressOwner(
  contract: ERC721,
  address: string
) {
  return !!Number(await contract.balanceOf(address))
}
