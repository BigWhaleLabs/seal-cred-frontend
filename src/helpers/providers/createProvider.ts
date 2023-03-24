import { providers } from 'ethers'
import Network from 'models/Network'
import alchemyOrJsonProvider from 'helpers/providers/alchemyOrJsonProvider'

export default function (
  network: Network,
  networkToRPC: { [network in 'heavy' | 'default']: string }
) {
  const rpcNetwork = network.toLowerCase()
  return {
    defaultProvider: new providers.JsonRpcProvider(
      networkToRPC.default,
      rpcNetwork
    ),
    heavyProvider: alchemyOrJsonProvider(networkToRPC.heavy, rpcNetwork),
    network,
  }
}
