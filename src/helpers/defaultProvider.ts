import { providers } from 'ethers'
import env from 'helpers/env'

export default new providers.JsonRpcProvider(
  env.VITE_ETH_RPC,
  env.VITE_ETH_NETWORK
)
