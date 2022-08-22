import { ContractsStore } from '@big-whale-labs/stores'
import { useSnapshot } from 'valtio'

export default function (store: ContractsStore) {
  const { addressToTokenIds } = useSnapshot(store)

  if (!addressToTokenIds) return []

  return Object.keys(addressToTokenIds).map((address) => address.toLowerCase())
}
