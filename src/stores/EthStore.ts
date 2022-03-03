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
      provider = new Web3Provider(instance)

      await this.handleAccountChanged()
      this.subscribeProvider(instance)
    } catch (error) {
      console.error(error)
    } finally {
      this.ethLoading = false
    }
  }

  async signMessage() {
    if (!provider) return

    this.ethLoading = true
    const signer = provider.getSigner()
    const signature = await signer.signMessage(await signer.getAddress())
    this.ethLoading = false
    return signature
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.ethLoading = true
    const accounts = await provider.listAccounts()

    if (accounts.length === 0) {
      this.accounts = undefined
    } else {
      this.accounts = accounts
    }

    this.ethLoading = false
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider || !provider.on) return

    provider.on('error', (error: Error) => {
      console.error(error)
    })
    provider.on('accountsChanged', () => this.handleAccountChanged())
    provider.on('disconnect', () => this.handleAccountChanged())
    provider.on('stop', () => this.handleAccountChanged())
  }
}

export default proxy(new EthStore()).makePersistent()
