import { Bitski } from 'bitski'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Fortmatic from 'fortmatic'
import Torus from '@toruslabs/torus-embed'
import WalletConnect from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

const infuraId = import.meta.env.VITE_INFURA_ID as string
const network = import.meta.env.VITE_ETH_NETWORK as string
const appName = import.meta.env.VITE_APP_NAME as string

const { theme } = useSnapshot(AppStore)

const configuredModal = new Web3Modal({
  cacheProvider: true,
  theme,
  disableInjectedProvider: false,
  network,
  providerOptions: {
    fortmatic: {
      package: Fortmatic,
      options: {
        key: import.meta.env.VITE_FORTMATIC_KEY as string,
        network,
      },
    },
    torus: {
      package: Torus,
    },
    walletconnect: {
      package: WalletConnect,
      options: {
        infuraId,
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
        appName,
        infuraId,
        darkMode: theme === 'dark' ? true : false,
      },
    },
    bitski: {
      package: Bitski,
      options: {
        clientId: import.meta.env.VITE_BITSKI_CLIENT_ID as string,
        callbackUrl: `${window.location.origin}/callback.html`,
      },
    },
  },
})

export default configuredModal
