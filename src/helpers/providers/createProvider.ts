import { providers } from 'ethers'
import Network from 'models/Network'
import alchemyOrJsonProvider from 'helpers/providers/alchemyOrJsonProvider'

export default function (
  network: Network,
  networkToRPC: { [network in 'heavy' | 'default']: string }
) {
  return {
    network,
    defaultProvider: new providers.JsonRpcProvider(
      networkToRPC.default,
      network.toLowerCase()
    ),
    heavyProvider: alchemyOrJsonProvider(
      networkToRPC.heavy,
      network.toLowerCase()
    ),
  }
}
