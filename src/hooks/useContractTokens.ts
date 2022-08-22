import { ContractsStore } from '@big-whale-labs/stores'
import { useSnapshot } from 'valtio'

export default function (address: string, store: ContractsStore) {
  const { addressToTokenIds } = useSnapshot(store)

  if (!addressToTokenIds) return []

  const key = Object.keys(addressToTokenIds).find(
    (storeAddress) => address.toLowerCase() === storeAddress.toLowerCase()
  )

  return key ? addressToTokenIds[key] : []
}
