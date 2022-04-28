import { providers } from 'ethers'
import env from 'helpers/env'

export default env.VITE_ETH_HTTP_URL
  ? new providers.JsonRpcProvider(env.VITE_ETH_HTTP_URL)
  : new providers.InfuraProvider(env.VITE_ETH_NETWORK, {
      projectId: env.VITE_INFURA_ID,
    })
