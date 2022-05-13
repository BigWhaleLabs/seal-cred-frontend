import { useSnapshot } from 'valtio'
import ENSStore from 'stores/ENSStore'

export default function (address: string) {
  const { ensNames } = useSnapshot(ENSStore)

  if (!ensNames[address]) {
    ENSStore.fetchtEnsName(address)
  }

  const name = Object.entries(ensNames).find(
    ([ensAddress]) => ensAddress === address
  )
  return name ? name[1] : address
}
