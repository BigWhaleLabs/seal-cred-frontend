import { SCERC721Derivative } from '@big-whale-labs/street-cred-ledger-contract'

export default async function getOwnerTokenIds(
  contract: SCERC721Derivative,
  ownerAddress: string
) {
  const eventsFilter = contract.filters.Transfer()
  const events = await contract.queryFilter(eventsFilter)
  const filtered = events.filter(({ args }) => args && args.to === ownerAddress)
  return Number(filtered[0].args.tokenId)
}
