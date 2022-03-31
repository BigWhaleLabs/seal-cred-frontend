import { InvitesAbi } from 'helpers/abiTypes'
import { InvitesAbi__factory } from 'helpers/abiTypes'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import configuredModal from 'helpers/configuredModal'

let provider: Web3Provider
let contract: InvitesAbi

class EthStore extends PersistableStore {
  accounts: string[] | undefined = undefined
  ethLoading = false

  async onConnect() {
    try {
      this.ethLoading = true

      const instance = await configuredModal.connect()
      provider = new Web3Provider(instance)

      contract = InvitesAbi__factory.connect(
        import.meta.env.VITE_INVITES_CONTRACT_ADDRESS as string,
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
    const signer = provider.getSigner()
    const signature = await signer.signMessage(
      forAddress ? forAddress : await signer.getAddress()
    )
    this.ethLoading = false
    return signature
  }

  async getAddresses() {
    if (!contract) return

    const rawInvites = await contract.getMintedInvites()

    return Object.values(rawInvites).map((output) => output.ethAddress)
  }

  async getTokenId() {
    if (!contract || !this.accounts) return

    // It's a low-digits integer (0x001), so we can lose precision here
    return Number(await contract.checkTokenId(this.accounts[0]))
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
