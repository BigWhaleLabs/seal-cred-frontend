import Network from 'models/Network'

export default function (address: string, network: Network) {
  return `https://${
    network === Network.Mainnet ? '' : network.toLowerCase()
  }etherscan.io/address/${address}`
}
