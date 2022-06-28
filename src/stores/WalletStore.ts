import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import BaseProof from 'helpers/BaseProof'
import ERC721BadgeBuilder from 'helpers/ERC721BadgeBuilder'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailBadgeBuilder from 'helpers/EmailBadgeBuilder'
import EmailProof from 'helpers/EmailProof'
import PersistableStore from 'stores/persistence/PersistableStore'
import env from 'helpers/env'
import handleError, { ErrorList } from 'helpers/handleError'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore extends PersistableStore {
  account?: string
  walletLoading = false
  walletsToNotifiedOfBeingDoxxed = {} as {
    [address: string]: boolean
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = ['account', 'walletLoading']
    return disallowList.includes(key) ? undefined : value
  }

  get cachedProvider() {
    return web3Modal.cachedProvider
  }

  async connect(clearCachedProvider = false) {
    this.walletLoading = true
    try {
      if (clearCachedProvider) web3Modal.clearCachedProvider()

      const instance = await web3Modal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== env.VITE_ETH_NETWORK && env.VITE_ETH_NETWORK)
        throw new Error(
          ErrorList.wrongNetwork(userNetwork, env.VITE_ETH_NETWORK)
        )
      this.account = (await provider.listAccounts())[0]
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

  async signMessage(message: string) {
    if (!provider) throw new Error('No provider')

    this.walletLoading = true
    try {
      const signer = provider.getSigner()
      const signature = await signer.signMessage(message)
      return signature
    } finally {
      this.walletLoading = false
    }
  }

  async mintDerivative(proof: BaseProof) {
    if (!provider) {
      throw new Error('No provider found')
    }
    if (!this.account) {
      throw new Error('No account found')
    }

    if (proof instanceof ERC721Proof) {
      const builder = new ERC721BadgeBuilder(provider)
      await builder.create(proof)
    }

    if (proof instanceof EmailProof) {
      const builder = new EmailBadgeBuilder(provider)
      await builder.create(proof)
    }
  }

  private async handleAccountChanged() {
    if (!provider || this.walletLoading) return

    this.walletLoading = true
    const accounts = await provider.listAccounts()
    this.account = accounts[0]
    setTimeout(() => (this.walletLoading = false), 500)
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => handleError(error))

    provider.on('accountsChanged', async (accounts: string[]) =>
      accounts.length ? await this.handleAccountChanged() : this.clearData()
    )
    provider.on('disconnect', (error: unknown) => {
      if (provider) provider.removeAllListeners()
      handleError(error)
      this.clearData()
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

const walletStore = proxy(new WalletStore()).makePersistent(true)

if (walletStore.cachedProvider) void walletStore.connect()

export default walletStore
