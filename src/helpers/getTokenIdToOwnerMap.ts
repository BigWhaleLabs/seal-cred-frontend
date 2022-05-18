import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { QUERY_BLOCK_LIMIT } from '@big-whale-labs/constants'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'

export default async function (contract: ERC721 | SCERC721Derivative) {
  const eventsFilter = contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter, QUERY_BLOCK_LIMIT)
  const ownerMap = {} as TokenIdToOwnerMap
  for (const event of events) {
    if (!event.args) {
      continue
    }
    const { to, tokenId } = event.args
    if (to) {
      ownerMap[tokenId.toNumber()] = to // should be alright to loose precision here
    }
  }
  return ownerMap
}
