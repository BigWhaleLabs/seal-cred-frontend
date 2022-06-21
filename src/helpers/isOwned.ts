import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

export default async function (
  contract: ERC721 | SCERC721Derivative,
  account: string
) {
  return (await contract.balanceOf(account)).gt(0)
}
