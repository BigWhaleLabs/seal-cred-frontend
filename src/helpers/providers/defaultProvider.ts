import { ETH_RPC, ETH_RPC_MAINNET } from '@big-whale-labs/constants'
import { providers } from 'ethers'
import env from 'helpers/env'

export const goerliDefaultProvider = new providers.JsonRpcProvider(
  ETH_RPC,
  env.VITE_ETH_NETWORK
)
export const mainnetDefaultProvider = new providers.JsonRpcProvider(
  ETH_RPC_MAINNET,
  'mainnet'
)
