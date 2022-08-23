import { ETH_RPC, ETH_RPC_MAINNET } from '@big-whale-labs/constants'
import Network from 'models/Network'
import createProvider from 'helpers/providers/createProvider'
import env from 'helpers/env'

export default {
  [Network.Mainnet]: {
    network: Network.Mainnet,
    ...createProvider(Network.Mainnet, {
      default: ETH_RPC_MAINNET,
      heavy: env.VITE_ETH_RPC_MAINNET,
    }),
  },
  [Network.Goerli]: {
    network: Network.Goerli,
    ...createProvider(Network.Goerli, {
      default: ETH_RPC,
      heavy: env.VITE_ETH_RPC,
    }),
  },
}
