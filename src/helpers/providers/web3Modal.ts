import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnect from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import env from 'helpers/env'

const rpc = env.VITE_ETH_RPC
const network = env.VITE_ETH_NETWORK
const appName = env.VITE_APP_NAME

export default new Web3Modal({
  cacheProvider: true,
  disableInjectedProvider: false,
  network,
  providerOptions: {
    coinbasewallet: {
      options: {
        appName,
        darkMode: true,
        rpc: {
          5: rpc,
        },
      },
      package: CoinbaseWalletSDK,
    },
    walletconnect: {
      options: {
        rpc: {
          5: rpc,
        },
      },
      package: WalletConnect,
    },
  },
  theme: 'dark',
})
