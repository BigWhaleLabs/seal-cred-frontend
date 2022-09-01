import { useSnapshot } from 'valtio'
import ContractsNetworkStore from 'stores/ContractsStore'
import Network from 'models/Network'

export default function (networkName?: Network) {
  const { networks } = useSnapshot(ContractsNetworkStore)

  const addressToTokenIds = (Object.keys(networks) as Network[])
    .filter((network) => !networkName || networkName === network)
    .reduce(
      (combined, networkName) => ({
        ...combined,
        ...networks[networkName].addressToTokenIds,
      }),
      {} as { [address: string]: readonly string[] }
    )

  return addressToTokenIds
}
