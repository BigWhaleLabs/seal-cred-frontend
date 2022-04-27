import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'

export default function isAddressOwner(contract: ERC721, address: string) {
  return !!Number(contract.balanceOf(address))
}
