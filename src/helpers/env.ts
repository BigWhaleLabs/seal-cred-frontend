const env = {
  VITE_ENCRYPT_KEY: import.meta.env.VITE_ENCRYPT_KEY,
  VITE_FORTMATIC_KEY: import.meta.env.VITE_FORTMATIC_KEY,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_ETH_NETWORK: import.meta.env.VITE_ETH_NETWORK,
  VITE_ETH_WS: import.meta.env.VITE_ETH_WS,
  VITE_ETH_RPC: import.meta.env.VITE_ETH_RPC,
  VITE_BITSKI_CLIENT_ID: import.meta.env.VITE_BITSKI_CLIENT_ID,
  VITE_SC_LEDGER_CONTRACT_ADDRESS: import.meta.env
    .VITE_SC_LEDGER_CONTRACT_ADDRESS,
  VITE_VERIFY_URL: import.meta.env.VITE_VERIFY_URL,
}

Object.values(env).forEach((value: string, index) => {
  if (value === '' || value === undefined || value === null)
    throw new Error(Object.keys(env)[index] + ' is not defined')
})

export default env
