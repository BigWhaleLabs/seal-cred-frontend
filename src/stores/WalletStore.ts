import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { hexValue } from 'ethers/lib/utils'
import { proxy } from 'valtio'
import { requestContractMetadata } from 'helpers/attestor'
import { serializeError } from 'eth-rpc-errors'
import BaseProof from 'helpers/BaseProof'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import Network from 'models/Network'
import NotificationsStore from 'stores/NotificationsStore'
import PersistableStore from 'stores/persistence/PersistableStore'
import chainForWallet from 'helpers/chainForWallet'
import createERC721Badge from 'helpers/createERC721Badge'
import createEmailBadge from 'helpers/createEmailBadge'
import createExternalERC721Badge from 'helpers/createExternalERC721Badge'
import env from 'helpers/env'
import handleError, { ErrorList } from 'helpers/handleError'
import relayProvider from 'helpers/providers/relayProvider'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore extends PersistableStore {
  account?: string
  walletLoading = false
  needNetworkChange = false
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

      await this.checkNetwork(provider)
      if (this.needNetworkChange)
        throw new Error(
          ErrorList.wrongNetwork(
            (await provider.getNetwork()).name,
            env.VITE_ETH_NETWORK
          )
        )

      this.account = (await provider.listAccounts())[0]
      this.subscribeProvider(instance)
    } catch (error) {
      if (error === 'Modal closed by user') return
      handleError(error)
      this.clearData()
    } finally {
      this.walletLoading = false
    }
  }

  async signMessage(message: string) {
    if (!provider) throw new Error('No provider')

    const signer = provider.getSigner()
    const signature = await signer.signMessage(message)
    return signature
  }

  async mintDerivative(proof: BaseProof) {
    if (!provider) throw new Error('No provider found')
    if (!this.account) throw new Error('No account found')

    const gsnProvider = await relayProvider(provider)

    const ethersProvider = new Web3Provider(
      gsnProvider as unknown as ExternalProvider
    )

    const maxFeePerGas = (await gsnProvider.calculateGasFees()).maxFeePerGas

    if (proof instanceof ERC721Proof) {
      if (proof.network === Network.Goerli)
        return createERC721Badge(ethersProvider, proof, maxFeePerGas)

      const signature = await requestContractMetadata(
        proof.network,
        proof.contract
      )
      return createExternalERC721Badge(
        ethersProvider,
        proof,
        signature.message,
        signature.signature,
        maxFeePerGas
      )
    }

    if (proof instanceof EmailProof)
      return createEmailBadge(ethersProvider, proof, maxFeePerGas)

    throw new Error('Unknown proof type')
  }

  private async checkNetwork(provider: Web3Provider) {
    const network = env.VITE_ETH_NETWORK
    const userNetwork = (await provider.getNetwork()).name
    if (userNetwork === network) return (this.needNetworkChange = false)

    this.needNetworkChange = true
    await this.requestChangeNetwork(provider)
  }

  private async requestChangeNetwork(provider: Web3Provider) {
    const chainId = hexValue(env.VITE_CHAIN_ID)

    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId }])
      this.needNetworkChange = false
    } catch (error) {
      const code = serializeError(error).code
      if (code !== 4902) return

      await provider.send('wallet_addEthereumChain', [chainForWallet()])
      this.needNetworkChange = false
    }
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.walletLoading = true
    const accounts = await provider.listAccounts()
    this.account = accounts[0]
    NotificationsStore.showTwitterShare = false
    this.walletLoading = false
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', (accounts: string[]) => {
      if (!accounts.length) this.clearData()

      this.account = undefined
      void this.handleAccountChanged()
    })
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
    NotificationsStore.showTwitterShare = false
    web3Modal.clearCachedProvider()
    this.account = undefined
  }
}

const walletStore = proxy(new WalletStore()).makePersistent(true)

if (walletStore.cachedProvider) void walletStore.connect()

export default walletStore
