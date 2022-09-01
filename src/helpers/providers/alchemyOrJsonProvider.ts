import { providers } from 'ethers'

export default function alchemyOrJsonProvider(url: string, network: string) {
  return url.includes('alchemy')
    ? new providers.AlchemyProvider(
        network,
        url.replace(/https:\/\/.+alchemy\.com\/v2\//gi, '')
      )
    : new providers.JsonRpcProvider(url, network)
}
