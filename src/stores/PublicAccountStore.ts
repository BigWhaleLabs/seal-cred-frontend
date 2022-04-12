import { DerivativeAbi__factory } from 'helpers/derivativeAbi'
import { Wallet, providers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { getProviderInfo } from 'web3modal'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import addressEqual from 'helpers/addressEqual'
import configuredModal from 'helpers/configuredModal'

const connectedProviders: Map<string, Web3Provider> = new Map()

export type Account = { provider: string; address: string }

const network = import.meta.env.VITE_ETH_NETWORK as string
class PublicAccountStore extends PersistableStore {
  defaultAccount: Wallet = Wallet.createRandom()
  currentAccount: Account = this.generated
  activeAccount: Map<string, Account> = new Map()
  connectedAccounts: Map<string, Set<string>> = new Map()
  ethLoading = false
  ethError = ''
  chainId = ''

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
      this.ethError = ''

      const instance = await configuredModal.connect()
      const provider = new Web3Provider(instance)
      const providerInfo = getProviderInfo(instance)
      const providerName = providerInfo.name

      connectedProviders.set(providerName, provider)

      const userNetwork = (await provider.getNetwork()).name

      if (userNetwork !== network) {
        this.ethError = `Looks like you're using ${userNetwork} network, try switching to ${network} and connect again`
        return
      }

      await this.handleConnectAccount(providerName)
      this.subscribeProvider(instance)
    } catch (error) {
      if (typeof error === 'string') return
      console.error(error)
      this.clearData()
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

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    const providerInfo = getProviderInfo(provider)
    const providerName = providerInfo.name

    provider.on('error', (error: Error) => {
      console.error(error)
      this.ethError = error.message
    })

    provider.on('accountsChanged', () => {
      if (this.ethError) return
      void this.handleConnectAccount(providerName)
    })

    provider.on('disconnect', () => {
      console.log('disconnect')
      if (this.ethError) return
      void this.handleAccountChanged(providerName)
    })

    provider.on('stop', () => {
      if (this.ethError) return
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

  private getContract() {
    const provider = new providers.InfuraProvider(
      network,
      import.meta.env.VITE_INFURA_ID as string
    )

    const walletWithProvider = new Wallet(
      this.defaultAccount.privateKey,
      provider
    )

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
        return new Map(value as [string, Account][])
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
        return value instanceof Map ? Array.from(value.entries()) : []
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

  async mintDerivative() {
    const derivativeContract = this.getContract()

    const transaction = await derivativeContract.mint()
    return await transaction.wait()
  }

  async checkAddressForMint(ethAddress: string) {
    try {
      const derivativeContract = this.getContract()

      const zeroBalance = (
        await derivativeContract.balanceOf(ethAddress)
      ).isZero()
      return !zeroBalance
    } catch (error) {
      console.error(error)
    }
  }

  async checkAddresIsOwner(tokenId: string, ethAddress: string) {
    const derivativeContract = this.getContract()
    const owner = await derivativeContract.ownerOf(tokenId)
    return addressEqual(owner, ethAddress)
  }
}

export default proxy(new PublicAccountStore()).makePersistent(true)
