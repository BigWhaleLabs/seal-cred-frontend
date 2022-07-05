import { ETH_RPC } from '@big-whale-labs/constants'
import { providers } from 'ethers'
import env from 'helpers/env'

export default new providers.JsonRpcProvider(ETH_RPC, env.VITE_ETH_NETWORK)
