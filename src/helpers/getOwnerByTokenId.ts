import { BigNumber } from 'ethers'
import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

export default async function (
  contract: ERC721 | SCERC721Derivative,
  id: BigNumber
) {
  const eventsFilter = contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter)
  let owner = ''
  while (events.length > 0) {
    const event = events.pop()
    if (!event || !event.args) continue
    const { to, tokenId } = event.args
    if (id.eq(tokenId)) {
      owner = to
      console.log(owner, event.blockNumber, id.eq(tokenId))
    }
  }
  return owner
}
