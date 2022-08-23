import { providers } from 'ethers'

export default function alchemyOrJsonProvider(network: string, url: string) {
  return url.includes('alchemy')
    ? new providers.AlchemyProvider(
        network,
        url.replace(/https:\/\/.+alchemy\.com\/v2\//gi, '')
      )
    : new providers.JsonRpcProvider(url, network)
}
