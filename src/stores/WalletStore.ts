import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { PersistableStore } from '@big-whale-labs/stores'
import { hexValue } from 'ethers/lib/utils'
import { proxy } from 'valtio'
import NotificationsStore from 'stores/NotificationsStore'
import env from 'helpers/env'
import handleError, { ErrorList } from 'helpers/handleError'
import relayProvider from 'helpers/providers/relayProvider'
import web3Modal from 'helpers/providers/web3Modal'

let provider: Web3Provider

const networkName = env.VITE_ETH_NETWORK

class WalletStore extends PersistableStore {
  account?: string
  walletLoading = false
  mintLoading = false
  needNetworkChange = false
  walletsToNotifiedOfBeingDoxxed = {} as {
    [address: string]: boolean
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = ['mintLoading', 'account', 'walletLoading']
    return disallowList.includes(key) ? undefined : value
  }

  get cachedProvider() {
    return web3Modal.cachedProvider
  }

  get isAccountNotifiedOfBeingDoxxed() {
    return this.account && this.walletsToNotifiedOfBeingDoxxed[this.account]
  }

  private async getUserNetworkName(provider: Web3Provider) {
    return (await provider.getNetwork()).name
  }

  private async isNetworkRight(provider: Web3Provider) {
    const userNetwork = await this.getUserNetworkName(provider)
    return networkName === userNetwork
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.walletLoading = true
    this.account = await this.getAccount()
    NotificationsStore.showTwitterShare = false
    this.walletLoading = false
  }

  private async getAccount() {
    return (await provider.listAccounts())[0]
  }

  private clearData() {
    NotificationsStore.showTwitterShare = false
    web3Modal.clearCachedProvider()
    this.account = undefined
  }

  private async switchNetwork() {
    const chainId = hexValue(env.VITE_CHAIN_ID)
    await provider.send('wallet_switchEthereumChain', [{ chainId }])
  }

  private setNetworkAndDropAccount() {
    this.needNetworkChange = true
    this.account = undefined
  }

  private subscribeProvider(localProvider: Web3Provider) {
    if (!localProvider.on) return

    localProvider.on('error', (error: Error) => {
      handleError(error)
    })

    localProvider.on('accountsChanged', (accounts: string[]) => {
      if (!accounts.length) this.clearData()

      this.account = undefined
      void this.handleAccountChanged()
    })
    localProvider.on('disconnect', (error: Error) => {
      // Sometimes this error fires when user switching between networks too fast, we should not clean data in this case
      if (error.message.includes('Attempting to connect.'))
        return handleError(error)

      if (localProvider) localProvider.removeAllListeners()
      handleError(error)
      this.clearData()
    })
    localProvider.on('chainChanged', async () => {
      if (await this.isNetworkRight(provider)) {
        this.needNetworkChange = false
        this.account = await this.getAccount()
        return
      }
      this.setNetworkAndDropAccount()
    })
  }

  private async connect(clearCachedProvider = false) {
    this.walletLoading = true
    try {
      if (provider) provider.removeAllListeners()
      if (clearCachedProvider) web3Modal.clearCachedProvider()

      const instance = await web3Modal.connect()
      // We need this "any" networks so we could handle when users switch between networks with listeners without errors
      provider = new Web3Provider(instance, 'any')

      this.account = await this.getAccount()
      if (!(await this.isNetworkRight(provider))) {
        this.setNetworkAndDropAccount()
        handleError(
          new Error(
            ErrorList.wrongNetwork(
              await this.getUserNetworkName(provider),
              networkName
            )
          )
        )
      }
      this.subscribeProvider(instance)
    } catch (error) {
      if (error === 'Modal closed by user') return
      handleError(error)
      this.clearData()
    } finally {
      this.walletLoading = false
    }
  }

  changeNetworkOrConnect({
    clearCachedProvider = false,
    needNetworkChange,
  }: {
    clearCachedProvider: boolean
    needNetworkChange?: boolean
  }) {
    if (needNetworkChange) return this.switchNetwork()
    return this.connect(clearCachedProvider)
  }

  async signMessage(message: string) {
    if (!provider) throw new Error('No provider')

    const signer = provider.getSigner()
    const signature = await signer.signMessage(message)
    return signature
  }

  async createGSNProvider() {
    if (!provider) throw new Error('No provider found')

    const gsnProvider = await relayProvider(provider)

    return new Web3Provider(gsnProvider as unknown as ExternalProvider)
  }
}

const walletStore = proxy(new WalletStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)

if (walletStore.cachedProvider)
  void walletStore.changeNetworkOrConnect({ clearCachedProvider: false })

export default walletStore
