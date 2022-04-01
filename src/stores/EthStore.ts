import { DerivativeAbi, DerivativeAbi__factory } from 'helpers/derivativeAbi'
import { InvitesAbi, InvitesAbi__factory } from 'helpers/invitesAbi'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import configuredModal from 'helpers/configuredModal'

let provider: Web3Provider
let invitesContract: InvitesAbi
let derivativeContract: DerivativeAbi

const ethNetwork = import.meta.env.VITE_ETH_NETWORK

class EthStore extends PersistableStore {
  accounts: string[] | undefined = undefined
  ethLoading = false
  derivativeMinted = false
  ethError = ''

  async onConnect() {
    try {
      this.ethLoading = true
      this.ethError = ''

      const instance = await configuredModal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== ethNetwork) {
        this.ethError = `Looks like you're using ${userNetwork} network, try switching to ${ethNetwork} and connect again`
        return
      }

      invitesContract = InvitesAbi__factory.connect(
        import.meta.env.VITE_INVITES_CONTRACT_ADDRESS as string,
        provider.getSigner(0)
      )

      derivativeContract = DerivativeAbi__factory.connect(
        import.meta.env.VITE_SC_DERIVATIVE_ADDRESS as string,
        provider.getSigner(0)
      )

      await this.handleAccountChanged()
      this.subscribeProvider(instance)
    } catch (error) {
      if (typeof error === 'string') return
      console.error(error)
      this.clearData()
    } finally {
      this.ethLoading = false
    }
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
    } finally {
      this.ethLoading = false
    }
  }

  async getAddresses() {
    if (!invitesContract) return

    const rawInvites = await invitesContract.getMintedInvites()

    return Object.values(rawInvites).map((output) => output.ethAddress)
  }

  async getTokenId() {
    if (!invitesContract || !this.accounts) return

    // It's a low-digits integer (0x001), so we can lose precision here
    return Number(await invitesContract.checkTokenId(this.accounts[0]))
  }

  async mintDerivative() {
    if (!this.accounts || this.ethError) return

    this.ethLoading = true
    try {
      const zeroBalance = (
        await derivativeContract.balanceOf(this.accounts[0])
      ).isZero()

      if (!zeroBalance) {
        this.derivativeMinted = true
        return
      }

      const transaction = await derivativeContract.mint()
      await transaction.wait()
      this.derivativeMinted = true
    } catch (error) {
      console.error(error)
    } finally {
      this.ethLoading = false
    }
  }

  private clearData() {
    configuredModal.clearCachedProvider()
    this.accounts = []
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
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      console.error(error)
      this.ethError = error.message
    })

    provider.on('accountsChanged', () => {
      if (this.ethError) return
      void this.handleAccountChanged()
    })
    provider.on('disconnect', () => {
      if (this.ethError) return
      void this.handleAccountChanged()
    })

    provider.on('stop', () => {
      if (this.ethError) return
      void this.handleAccountChanged()
    })
    provider.on('networkChanged', async () => {
      this.clearData()
      await this.onConnect()
    })
  }
}

export default proxy(new EthStore()).makePersistent()
