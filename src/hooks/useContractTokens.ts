import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'

export default function (address: string, store: ContractsStore) {
  const { addressToTokenIds } = useSnapshot(store)

  if (!addressToTokenIds) return []

  const key = Object.keys(addressToTokenIds).find(
    (storeAddress) => address.toLowerCase() === storeAddress.toLowerCase()
  )

  return key ? addressToTokenIds[key] : null
}
