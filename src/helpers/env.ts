import {
  ETH_NETWORK,
  ETH_RPC,
  FORTMATIC_KEY,
  SCLEDGER_CONTRACT_ADDRESS,
} from '@big-whale-labs/constants'

const env = {
  VITE_ENCRYPT_KEY: import.meta.env.VITE_ENCRYPT_KEY as string,
  VITE_FORTMATIC_KEY:
    (import.meta.env.VITE_FORTMATIC_KEY as string) || FORTMATIC_KEY,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME as string,
  VITE_ETH_NETWORK: (import.meta.env.VITE_ETH_NETWORK as string) || ETH_NETWORK,
  VITE_ETH_RPC: (import.meta.env.VITE_ETH_RPC as string) || ETH_RPC,
  VITE_SCLEDGER_CONTRACT_ADDRESS:
    (import.meta.env.VITE_SCLEDGER_CONTRACT_ADDRESS as string) ||
    SCLEDGER_CONTRACT_ADDRESS,
  VITE_VERIFY_URL: import.meta.env.VITE_VERIFY_URL as string,
}

Object.values(env).forEach((value: string, index) => {
  if (value === '' || value === undefined || value === null)
    throw new Error(Object.keys(env)[index] + ' is not defined')
})

export default env
