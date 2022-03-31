import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import configuredModal from 'helpers/configuredModal'

let provider: Web3Provider

const wait = (log: string, ms: number) => {
  console.log(`Function requst ${log}!`)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${log} succesfully`)
      resolve(true)
    }, ms)
  })
}

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

  async generateInput() {
    await wait('Generate the input', 2000)
  }
  async checkProof() {
    await wait('Check the proof', 8000)
  }
  async mintingDerivative() {
    await wait('Mint the NFT', 5000)
  }

  async signMessage(forAddress?: string) {
    if (!provider) return

    this.ethLoading = true
    try {
      const signer = provider.getSigner()
      const signature = await signer.signMessage(
        forAddress ? forAddress : await signer.getAddress()
      )
      return signature
    } catch (e) {
      throw e
    } finally {
      this.ethLoading = false
    }
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
