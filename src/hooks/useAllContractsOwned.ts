import { useSnapshot } from 'valtio'
import ContractsNetworkStore from 'stores/ContractsStore'

export default function () {
  const { networks } = useSnapshot(ContractsNetworkStore)

  const addressToTokenIds = Object.values(networks).reduce(
    (combined, { addressToTokenIds }) => ({
      ...combined,
      ...addressToTokenIds,
    }),
    {}
  )

  if (!addressToTokenIds) return []

  return Object.keys(addressToTokenIds).map((address) => address.toLowerCase())
}
