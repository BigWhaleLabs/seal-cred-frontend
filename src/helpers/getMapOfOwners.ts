import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'

export default async function getMapOfOwners(contract: ERC721) {
  const eventsFilter = contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter)
  const ownerMap = new Map<number, string>()
  for (const event of events) {
    if (!event.args) {
      continue
    }
    const { to, tokenId } = event.args
    if (to) {
      ownerMap.set(tokenId.toNumber(), to)
    }
  }
  return ownerMap
}
