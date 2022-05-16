import { useSnapshot } from 'valtio'
import EnsStore from 'stores/EnsStore'

export default function (address: string) {
  const { ensNames } = useSnapshot(EnsStore)
  EnsStore.fetchEnsName(address)

  const ensName = ensNames[address]

  return ensName ? ensName : address
}
