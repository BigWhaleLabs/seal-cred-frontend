import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import configuredModal from 'helpers/configuredModal'

let provider: Web3Provider

class EthStore extends PersistableStore {
  accounts: string[] | undefined = undefined
  ethLoading = false

  async onConnect() {
    try {
      this.ethLoading = true

      const instance = await configuredModal.connect()
      const provider = new Web3Provider(instance)
      const accounts = await provider.listAccounts()

      this.handleAccountChanged(accounts)
      this.subscribeProvider(instance)
    } catch (error) {
      console.error(error)
    } finally {
      this.ethLoading = false
    }
  }

  async signMessage(message: string) {
    if (!provider) return

    this.ethLoading = true
    const signature = await provider.getSigner().signMessage(message)
    this.ethLoading = false
    return signature
  }

  private handleAccountChanged(accounts: string[]) {
    this.ethLoading = true

    if (accounts.length === 0) {
      this.accounts = undefined
    } else {
      this.accounts = accounts
    }

    this.ethLoading = false
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      console.error(error)
    })
    provider.on('accountsChanged', (accounts: string[]) => {
      this.handleAccountChanged(accounts)
    })
    provider.on('disconnect', (accounts: string[]) => {
      this.handleAccountChanged(accounts)
    })
    provider.on('stop', (accounts: string[]) => {
      this.handleAccountChanged(accounts)
    })
  }
}

export default proxy(new EthStore()).makePersistent()
