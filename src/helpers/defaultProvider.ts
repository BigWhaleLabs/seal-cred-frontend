import { providers } from 'ethers'
import env from 'helpers/env'

export default new providers.InfuraProvider(env.VITE_ETH_NETWORK, {
  projectId: env.VITE_INFURA_ID,
})
