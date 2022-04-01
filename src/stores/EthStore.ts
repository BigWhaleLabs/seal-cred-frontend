import { DerivativeAbi, DerivativeAbi__factory } from 'helpers/derivativeAbi'
import { InvitesAbi, InvitesAbi__factory } from 'helpers/invitesAbi'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import configuredModal from 'helpers/configuredModal'

let provider: Web3Provider
let invitesContract: InvitesAbi
let derivativeContract: DerivativeAbi

class EthStore extends PersistableStore {
  accounts: string[] | undefined = undefined
  ethLoading = false
  derivativeMinted = false

  async onConnect() {
    try {
      this.ethLoading = true

      const instance = await configuredModal.connect()
      provider = new Web3Provider(instance)

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
      console.error(error)
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
    if (!this.accounts) return

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
