import SealCredStore from 'stores/SealCredStore'

export default async function getMapOfOriginalContractOwners(address: string) {
  const originalContractTokenIdToOwnerMap = await SealCredStore
    .originalContractsToOwnersMaps[address]
  const owners = new Set<string>()
  for (const owner of Object.values(originalContractTokenIdToOwnerMap)) {
    owners.add(owner)
  }
  return Array.from(owners)
}
