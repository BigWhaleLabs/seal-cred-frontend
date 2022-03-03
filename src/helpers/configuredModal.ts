import { Bitski } from 'bitski'
import Fortmatic from 'fortmatic'
import Torus from '@toruslabs/torus-embed'
import WalletConnect from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import Web3Modal from 'web3modal'

const infuraId = import.meta.env.VITE_INFURA_ID as string
const fortmaticNetwork = {
  rpcUrl: import.meta.env.VITE_FORMATIC_RPC as string,
  chainId: 137,
}

const configuredModal = new Web3Modal({
  cacheProvider: true,
  theme: 'dark',
  disableInjectedProvider: false,
  network: import.meta.env.VITE_ETH_NETWORK as string,
  providerOptions: {
    fortmatic: {
      package: Fortmatic,
      options: {
        key: import.meta.env.VITE_FORTMATIC_KEY as string,
        network: fortmaticNetwork,
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
    walletlink: {
      package: WalletLink,
      options: {
        appName: 'Dosu-Invites',
        infuraId,
        darkMode: true,
      },
    },
    bitski: {
      package: Bitski,
      options: {
        clientId: import.meta.env.VITE_BITSKI_CLIENT_ID,
        callbackUrl: `${window.location.origin}/callback.html`,
      },
    },
  },
})

export default configuredModal
