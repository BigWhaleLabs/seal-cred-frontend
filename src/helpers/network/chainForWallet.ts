import { hexValue } from 'ethers/lib/utils'
import env from 'helpers/env'

export default function () {
  const id = env.VITE_CHAIN_ID
  const chainId = hexValue(id)

  const idToName: { [chainId: number]: string } = {
    1: 'mainnet',
    3: 'ropsten',
    4: 'rinkeby',
    5: 'goerli',
  }
  const name = idToName[id]
  const firstCapitalName = name.charAt(0).toUpperCase() + name.slice(1)
  const blockExplorerUrl =
    name === 'mainnet'
      ? 'https://etherscan.io/'
      : `https://${name}.etherscan.io/`

  const currency = `${firstCapitalName}ETH`

  return {
    chainId,
    rpcUrls: [`https://${name}.infura.io/v3/`],
    chainName: `${firstCapitalName} Test Network`,
    nativeCurrency: {
      name: currency,
      symbol: currency,
    },
    blockExplorerUrls: [blockExplorerUrl],
  }
}
