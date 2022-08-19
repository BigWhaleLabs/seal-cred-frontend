import { ETH_RPC_MAINNET } from '@big-whale-labs/constants'
import { goerliHeavyProvider } from 'helpers/providers/heavyProvider'
import { providers } from 'ethers'

export const goerliDefaultProvider = goerliHeavyProvider
export const mainnetDefaultProvider = new providers.JsonRpcProvider(
  ETH_RPC_MAINNET,
  'mainnet'
)
