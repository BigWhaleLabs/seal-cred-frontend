import { DerivativeAbi__factory } from 'helpers/derivativeAbi'
import { Wallet, providers } from 'ethers'
import { getPublicTokens } from 'helpers/api'
import { proxy } from 'valtio'
import ConnectedIdentity from 'models/ConnectedIdentity'
import PersistableStore from 'stores/persistence/PersistableStore'
import PublicBadge from 'models/PublicBadge'

const network = import.meta.env.VITE_ETH_NETWORK as string

class PublicAccountStore extends PersistableStore {
  mainEthWallet: Wallet = Wallet.createRandom({ network })
  connectedIdentities: ConnectedIdentity[] = []
  loading = false
  publicBadges: PublicBadge[] = []

  private getContract() {
    const provider = new providers.InfuraProvider(
      network,
      import.meta.env.VITE_INFURA_PROJECT_ID as string
    )

    const walletWithProvider = new Wallet(
      this.mainEthWallet.privateKey,
      provider
    )

    return DerivativeAbi__factory.connect(
      import.meta.env.VITE_SC_DERIVATIVE_ADDRESS as string,
      walletWithProvider
    )
  }

  reviver = (key: string, value: unknown) => {
    switch (key) {
      case 'mainEthWallet': {
        const mainEthWalletValue = value as {
          address: string
          privateKey: string
        }
        return new Wallet(mainEthWalletValue.privateKey)
      }
      case 'loading':
        return undefined
      case 'publicBadges':
        return undefined
      default:
        return value
    }
  }

  replacer = (key: string, value: unknown) => {
    switch (key) {
      case 'mainEthWallet': {
        const mainEthWalletValue = value as {
          address: string
          privateKey: string
        }
        return {
          address: mainEthWalletValue.address,
          privateKey: mainEthWalletValue.privateKey,
        }
      }
      case 'loading':
        return false
      case 'publicBadges':
        return []
      default:
        return value
    }
  }

  async fetchPublicBadges(address?: string) {
    this.loading = true
    try {
      this.publicBadges = await getPublicTokens(
        address || this.mainEthWallet.address
      )
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }

  async mintDerivative() {
    this.loading = true
    try {
      const derivativeContract = this.getContract()

      const transaction = await derivativeContract.mint()
      return await transaction.wait()
    } finally {
      this.loading = false
    }
  }

  async checkAddressForMint(ethAddress: string) {
    this.loading = true

    try {
      const derivativeContract = this.getContract()

      const zeroBalance = (
        await derivativeContract.balanceOf(ethAddress)
      ).isZero()
      return !zeroBalance
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }
}

export default proxy(new PublicAccountStore()).makePersistent(true)
