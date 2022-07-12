import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'

export default function (store: ContractsStore) {
  const { addressToTokenIds } = useSnapshot(store)

  if (!addressToTokenIds) return []

  return Object.keys(addressToTokenIds)
}
