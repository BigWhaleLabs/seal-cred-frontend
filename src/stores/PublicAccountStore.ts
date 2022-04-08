import { DerivativeAbi__factory } from 'helpers/derivativeAbi'
import { Wallet, providers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import addressEqual from 'helpers/addressEqual'
import configuredModal from 'helpers/configuredModal'

let provider: Web3Provider

const network = import.meta.env.VITE_ETH_NETWORK as string
class PublicAccountStore extends PersistableStore {
  defaultAccount: Wallet = Wallet.createRandom()
  currentAccount: string = this.defaultAccount.address
  connectedAccounts: Set<string> = new Set()
  ethLoading = false
  ethError = ''

  get accounts() {
    return [this.defaultAccount.address, ...this.connectedAccounts]
  }

  get privateKey() {
    return this.currentAccount === this.defaultAccount.address
      ? this.defaultAccount.privateKey
      : null
  }

  get account() {
    return this.currentAccount
  }

  async onConnect() {
    try {
      this.ethLoading = true
      this.ethError = ''

      const instance = await configuredModal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== network) {
        this.ethError = `Looks like you're using ${userNetwork} network, try switching to ${network} and connect again`
        return
      }

      await this.handleConnectAccount()
      this.subscribeProvider(instance)
    } catch (error) {
      if (typeof error === 'string') return
      console.error(error)
      this.clearData()
    } finally {
      this.ethLoading = false
    }
  }

  private async handleConnectAccount() {
    const accounts = await this.handleAccountChanged()

    if (accounts.length > 0) {
      this.currentAccount = accounts[0]
    }
  }

  private async handleAccountChanged() {
    if (!provider) return []

    this.ethLoading = true
    const accounts = await provider.listAccounts()

    console.log('handleAccountChanged')

    for (const account of accounts) {
      this.connectedAccounts.add(account)
    }

    this.ethLoading = false

    return accounts
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      console.error(error)
      this.ethError = error.message
    })

    provider.on('accountsChanged', () => {
      if (this.ethError) return
      void this.handleConnectAccount()
    })

    provider.on('disconnect', () => {
      if (this.ethError) return
      void this.handleAccountChanged()
    })

    provider.on('stop', () => {
      if (this.ethError) return
      void this.handleAccountChanged()
    })

    provider.on('chainChanged', async () => {
      this.clearData()
      await this.onConnect()
    })
  }

  private clearData() {
    configuredModal.clearCachedProvider()
    this.connectedAccounts = new Set()
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
      case 'connectedAccounts': {
        return new Set(value as string[])
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
      case 'connectedAccounts': {
        return [...(value as Set<string>)]
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
