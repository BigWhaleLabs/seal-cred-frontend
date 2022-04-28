import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'

export default async function ownsToken(
  contract: ERC721 | SCERC721Derivative,
  account: string
) {
  return !!Number(await contract.balanceOf(account))
}
