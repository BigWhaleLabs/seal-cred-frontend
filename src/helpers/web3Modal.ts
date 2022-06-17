import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
// import Fortmatic from 'fortmatic'
import WalletConnect from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import env from 'helpers/env'

const rpc = env.VITE_ETH_RPC
const network = env.VITE_ETH_NETWORK
const appName = env.VITE_APP_NAME

export default new Web3Modal({
  cacheProvider: true,
  theme: 'dark',
  disableInjectedProvider: false,
  network,
  providerOptions: {
    // fortmatic: {
    //   package: Fortmatic,
    //   options: {
    //     key: env.VITE_FORTMATIC_KEY,
    //     network,
    //   },
    // },
    walletconnect: {
      package: WalletConnect,
      options: {
        rpc: {
          5: rpc,
        },
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName,
        rpc: {
          4: rpc,
        },
        darkMode: true,
      },
    },
  },
})
