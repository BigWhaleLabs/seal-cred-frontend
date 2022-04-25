import { ErrorList, handleError } from 'helpers/handleError'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import env from 'helpers/env'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore {
  account?: string
  walletLoading = false

  async connect() {
    try {
      this.walletLoading = true

      const instance = await web3Modal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== env.VITE_ETH_NETWORK)
        throw new Error(
          ErrorList.wrongNetwork(userNetwork, env.VITE_ETH_NETWORK)
        )

      await this.handleAccountChanged()
      this.subscribeProvider(instance)
    } catch (error) {
      if (error !== 'Modal closed by user') {
        handleError(error)
        this.clearData()
      }
    } finally {
      this.walletLoading = false
    }
  }

  async signMessage(forAddress?: string) {
    if (!provider) return

    this.walletLoading = true
    try {
      const signer = provider.getSigner()
      const signature = await signer.signMessage(
        forAddress ? forAddress : await signer.getAddress()
      )
      return signature
    } finally {
      this.walletLoading = false
    }
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.walletLoading = true
    const accounts = await provider.listAccounts()

    this.account = accounts[0]

    this.walletLoading = false
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', () => {
      void this.handleAccountChanged()
    })
    provider.on('disconnect', () => {
      void this.handleAccountChanged()
    })

    provider.on('stop', () => {
      void this.handleAccountChanged()
    })
    provider.on('chainChanged', async () => {
      this.account = undefined
      await this.connect()
    })
  }

  private clearData() {
    web3Modal.clearCachedProvider()
    this.account = undefined
  }
}

export default proxy(new WalletStore())
