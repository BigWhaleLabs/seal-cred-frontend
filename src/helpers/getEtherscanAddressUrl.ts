import env from 'helpers/env'

const network =
  env.VITE_ETH_NETWORK !== 'mainnet' ? `${env.VITE_ETH_NETWORK}.` : ''

export default function (address: string) {
  return `https://${network}etherscan.io/address/${address}`
}
