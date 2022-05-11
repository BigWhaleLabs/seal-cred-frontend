import { providers } from 'ethers'
import env from 'helpers/env'

export default new providers.WebSocketProvider(
  env.VITE_ETH_WS,
  env.VITE_ETH_NETWORK
)
