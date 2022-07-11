import { providers } from 'ethers'
import env from 'helpers/env'

export const goerliDefaultProvider = new providers.JsonRpcProvider(
  env.VITE_ETH_RPC,
  env.VITE_ETH_NETWORK
)
export const mainnetDefaultProvider = new providers.JsonRpcProvider(
  env.VITE_ETH_RPC_MAINNET,
  'mainnet'
)
