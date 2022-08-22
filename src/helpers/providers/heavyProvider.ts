import { providers } from 'ethers'
import env from 'helpers/env'

function alchemyOrJsonProvider(network: string, url: string) {
  return url.includes('alchemy')
    ? new providers.AlchemyProvider(
        network,
        url.replace(/https:\/\/.+alchemy\.com\/v2\//gi, '')
      )
    : new providers.JsonRpcProvider(url, network)
}

export const goerliHeavyProvider = alchemyOrJsonProvider(
  env.VITE_ETH_NETWORK,
  env.VITE_ETH_RPC
)
export const mainnetHeavyProvider = alchemyOrJsonProvider(
  'mainnet',
  env.VITE_ETH_RPC_MAINNET
)
