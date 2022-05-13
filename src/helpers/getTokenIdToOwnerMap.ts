import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import queryBlockLimit from 'helpers/queryBlockLimit'

export default async function getTokenIdToOwnerMap(
  contract: ERC721 | SCERC721Derivative
) {
  const eventsFilter = contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter, queryBlockLimit)
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
