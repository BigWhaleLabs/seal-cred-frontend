import {
  ETH_NETWORK,
  ETH_RPC,
  ETH_RPC_MAINNET,
  GSN_PAYMASTER_CONTRACT_ADDRESS,
  GSN_SC_RELAY,
  SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
  SC_ERC721_LEDGER_CONTRACT_ADDRESS,
  SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
  VERIFY_URL,
} from '@big-whale-labs/constants'
import { cleanEnv, num, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ENCRYPT_KEY: str(),
  VITE_APP_NAME: str(),
  VITE_ETH_NETWORK: str({ default: ETH_NETWORK }),
  VITE_CHAIN_ID: num({ default: 5 }),
  VITE_ETH_RPC: str({ default: ETH_RPC }),
  VITE_ETH_RPC_MAINNET: str({ default: ETH_RPC_MAINNET }),
  VITE_SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS: str({
    default: SC_EXTERNAL_ERC721_LEDGER_CONTRACT_ADDRESS,
  }),
  VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS: str({
    default: SC_ERC721_LEDGER_CONTRACT_ADDRESS,
  }),
  VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS: str({
    default: SC_EMAIL_LEDGER_CONTRACT_ADDRESS,
  }),
  VITE_GSN_PAYMASTER_CONTRACT_ADDRESS: str({
    default: GSN_PAYMASTER_CONTRACT_ADDRESS,
  }),
  VITE_GSN_SC_RELAY: str({
    default: GSN_SC_RELAY,
  }),
  VITE_VERIFY_URL: str({ default: VERIFY_URL }),
})
