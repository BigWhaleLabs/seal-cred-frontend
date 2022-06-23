import { ERC721, SCERC721Derivative } from '@upacyxou/test-contract'

export default async function (
  contract: ERC721 | SCERC721Derivative,
  account: string
) {
  return (await contract.balanceOf(account)).gt(0)
}
