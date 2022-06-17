import {
  ETH_NETWORK,
  ETH_RPC,
  SCLEDGER_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'
import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ENCRYPT_KEY: str(),
  VITE_APP_NAME: str(),
  VITE_ETH_NETWORK: str({ default: ETH_NETWORK }),
  VITE_ETH_RPC: str({ default: ETH_RPC }),
  VITE_SCLEDGER_CONTRACT_ADDRESS: str({ default: SCLEDGER_CONTRACT_ADDRESS }),
  VITE_VERIFY_URL: str(),
})
