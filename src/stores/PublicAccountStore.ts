import { DerivativeAbi__factory } from 'helpers/abiTypes/derivativeAbi'
import { ErrorList, handleError } from 'helpers/handleError'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { Wallet, providers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { getProviderInfo } from 'web3modal'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResponse from 'models/ProofResponse'
import addressEqual from 'helpers/addressEqual'
import configuredModal from 'helpers/configuredModal'

const network = import.meta.env.VITE_ETH_NETWORK as string
const generatedProvider = new providers.InfuraProvider(
  network,
  import.meta.env.VITE_INFURA_ID as string
)

const connectedProviders: Map<string, JsonRpcProvider> = new Map()
connectedProviders.set('Generated', generatedProvider)

export type Account = { provider: string; address: string }

class PublicAccountStore extends PersistableStore {
  defaultAccount: Wallet = Wallet.createRandom()
  currentAccount: Account = this.generated
  activeAccount: Map<string, Account> = new Map()
  connectedAccounts: Map<string, Set<string>> = new Map()
  ethLoading = false
  chainId = ''
  blockId = ''

  constructor() {
    super()
    generatedProvider.on('block', () => {
      const currentBlock = generatedProvider.getBlockNumber().toString()
      if (currentBlock !== this.blockId) this.blockId = currentBlock
    })
  }

  get generated() {
    return {
      address: this.defaultAccount.address,
      provider: 'Generated',
    }
  }

  get accounts() {
    const prepared = [this.generated]

    for (const [provider, accounts] of this.connectedAccounts) {
      for (const address of accounts) {
        prepared.push({ address, provider })
      }
    }

    return prepared
  }

  hasPrivateKey(account: Account) {
    return this.defaultAccount.address === account.address
  }

  isActive(account: Account) {
    if (account.provider === 'Generated') return true
    return this.activeAccount.get(account.provider)?.address === account.address
  }

  get privateKey() {
    return this.currentAccount.address === this.defaultAccount.address
      ? this.defaultAccount.privateKey
      : null
  }

  get account() {
    return this.currentAccount
  }

  removeAccount(account: Account) {
    this.connectedAccounts.get(account.provider)?.delete(account.address)
    this.connectedAccounts = new Map(this.connectedAccounts.entries())
  }

  async onConnect() {
    try {
      this.ethLoading = true

      const instance = await configuredModal.connect()
      const provider = new Web3Provider(instance)
      const providerInfo = getProviderInfo(instance)
      const providerName = providerInfo.name

      connectedProviders.set(providerName, provider)

      const userNetwork = (await provider.getNetwork()).name

      if (userNetwork !== network)
        throw new Error(ErrorList.wrongNetwork(userNetwork, network))

      await this.handleConnectAccount(providerName)
      this.subscribeProvider(instance)
    } catch (error) {
      if (error !== 'Modal closed by user') {
        handleError(error)
        this.clearData()
      }
    } finally {
      this.ethLoading = false
    }
  }

  private async handleConnectAccount(providerName: string) {
    const accounts = await this.handleAccountChanged(providerName)

    if (accounts.length > 0) {
      this.currentAccount = {
        provider: providerName,
        address: accounts[0] || this.defaultAccount.address,
      }

      this.activeAccount.set(providerName, this.currentAccount)
      this.activeAccount = new Map(this.activeAccount.entries())
    }
  }

  private async handleAccountChanged(providerName: string) {
    const provider = connectedProviders.get(providerName)
    if (!provider) return []

    this.ethLoading = true
    const accounts = await provider.listAccounts()

    const accountsSet = this.connectedAccounts.get(providerName) || new Set()

    for (const address of accounts) {
      accountsSet.add(address)
    }

    this.connectedAccounts.set(providerName, accountsSet)
    this.ethLoading = false

    return accounts
  }

  private subscribeProvider(provider: JsonRpcProvider) {
    if (!provider.on) return

    const providerInfo = getProviderInfo(provider)
    const providerName = providerInfo.name

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', () => {
      void this.handleConnectAccount(providerName)
    })

    provider.on('disconnect', () => {
      void this.handleAccountChanged(providerName)
    })

    provider.on('stop', () => {
      void this.handleAccountChanged(providerName)
    })

    provider.on('chainChanged', async (chainId: string) => {
      if (this.chainId !== chainId) {
        this.chainId = chainId
        this.clearData()
        await this.onConnect()
      }
    })
  }

  private clearData() {
    configuredModal.clearCachedProvider()
    this.connectedAccounts = new Map()
  }

  getWalletWithProvider(account: Account) {
    return connectedProviders.get(account.provider)
  }

  private getContract(account: Account) {
    const walletWithProvider = this.getWalletWithProvider(account)

    if (!walletWithProvider) return null

    return DerivativeAbi__factory.connect(
      import.meta.env.VITE_SC_DERIVATIVE_ADDRESS as string,
      walletWithProvider
    )
  }

  reviver = (key: string, value: unknown) => {
    switch (key) {
      case 'defaultAccount': {
        const defaultAccountValue = value as {
          address: string
          privateKey: string
        }
        return new Wallet(defaultAccountValue.privateKey)
      }
      case 'activeAccount': {
        return new Map()
      }
      case 'connectedAccounts': {
        return new Map(
          (value as string[][]).map(([provider, accounts]) => [
            provider,
            new Set(accounts),
          ])
        )
      }
      default:
        return value
    }
  }

  replacer = (key: string, value: unknown) => {
    switch (key) {
      case 'defaultAccount': {
        const defaultAccountValue = value as {
          address: string
          privateKey: string
        }
        return {
          address: defaultAccountValue.address,
          privateKey: defaultAccountValue.privateKey,
        }
      }
      case 'activeAccount': {
        return []
      }
      case 'connectedAccounts': {
        return value instanceof Map
          ? Array.from(value.entries()).map(([provider, accounts]) => [
              provider,
              [...accounts],
            ])
          : []
      }
      default:
        return value
    }
  }

  async mintDerivative(proof: ProofResponse) {
    const derivativeContract = this.getContract(this.currentAccount)

    if (!derivativeContract) return

    const transaction = await derivativeContract.mint(
      proof.proof.pi_a,
      proof.proof.pi_b,
      proof.proof.pi_c,
      proof.publicSignals
    )
    return transaction.wait()
  }

  async checkAddressForMint(ethAddress: string) {
    try {
      const derivativeContract = this.getContract(this.currentAccount)

      if (!derivativeContract) return

      const zeroBalance = (
        await derivativeContract.balanceOf(ethAddress)
      ).isZero()
      return !zeroBalance
    } catch (error) {
      handleError(error)
    }
  }

  async checkAddressIsOwner(tokenId: string, ethAddress: string) {
    const derivativeContract = this.getContract(this.currentAccount)

    if (!derivativeContract) return

    const owner = await derivativeContract.ownerOf(tokenId)
    return addressEqual(owner, ethAddress)
  }

  async getBalance(account: Account) {
    return formatEther(await generatedProvider.getBalance(account.address))
  }
}

const exportedStore = proxy(new PublicAccountStore()).makePersistent(true)

export default exportedStore
