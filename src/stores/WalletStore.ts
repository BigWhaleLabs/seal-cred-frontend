import { Eip1193Bridge } from '@ethersproject/experimental'
import { RelayProvider } from '@opengsn/provider'
import { Web3Provider } from '@ethersproject/providers'
import { WrapBridge } from '@opengsn/provider/dist/WrapContract'
import { hexValue } from 'ethers/lib/utils'
import { proxy } from 'valtio'
import { requestContractMetadata } from 'helpers/attestor'
import { serializeError } from 'eth-rpc-errors'
import BaseProof from 'helpers/BaseProof'
import ERC721BadgeBuilder from 'helpers/ERC721BadgeBuilder'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailBadgeBuilder from 'helpers/EmailBadgeBuilder'
import EmailProof from 'helpers/EmailProof'
import ExternalERC721BadgeBuilder from 'helpers/ExternalERC721BadgeBuilder'
import Network from 'models/Network'
import NotificationsStore from 'stores/NotificationsStore'
import PersistableStore from 'stores/persistence/PersistableStore'
import chainForWallet from 'helpers/chainForWallet'
import env from 'helpers/env'
import handleError, { ErrorList } from 'helpers/handleError'
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
    if (!provider) {
      throw new Error('No provider found')
    }
    if (!this.account) {
      throw new Error('No account found')
    }

    if (proof instanceof ERC721Proof) {
      if (proof.network === Network.Goerli) {
        const relayProvider = await RelayProvider.newProvider({
          provider: new WrapBridge(
            new Eip1193Bridge(provider.getSigner(), provider)
          ),
          config: {
            paymasterAddress: env.VITE_PAYMASTER_ADDRESS,
            preferredRelays: [env.VITE_RELAY_HUB_CONTRACT_ADDRESS],
          },
        }).init()

        const ethersProvider = new Web3Provider(relayProvider)
        const builder = new ERC721BadgeBuilder(ethersProvider)
        return builder.create(proof)
      } else {
        const builder = new ExternalERC721BadgeBuilder(provider)

        const signature = await requestContractMetadata(
          proof.network,
          proof.contract
        )
        return builder.create(proof, signature.message, signature.signature)
      }
    }

    if (proof instanceof EmailProof) {
      const builder = new EmailBadgeBuilder(provider)
      return builder.create(proof)
    }

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
