import Network from 'models/Network'
import createProvider from 'helpers/providers/createProvider'
import env from 'helpers/env'

export default {
  [Network.Mainnet]: createProvider(Network.Mainnet, {
    default: env.VITE_ETH_RPC_MAINNET,
    heavy: env.VITE_ETH_RPC_MAINNET,
  }),
  [Network.Goerli]: createProvider(Network.Goerli, {
    default: env.VITE_ETH_RPC,
    heavy: env.VITE_ETH_RPC,
  }),
}
