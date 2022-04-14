import { ErrorList, handleError } from 'helpers/handleError'
import { InvitesAbi, InvitesAbi__factory } from 'helpers/abiTypes/invitesAbi'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import configuredModal from 'helpers/configuredModal'

let provider: Web3Provider
let invitesContract: InvitesAbi

const ethNetwork = import.meta.env.VITE_ETH_NETWORK as string

class EthStore extends PersistableStore {
  accounts: string[] = []
  ethLoading = false

  async onConnect() {
    try {
      this.ethLoading = true

      const instance = await configuredModal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== ethNetwork)
        throw new Error(ErrorList.wrongNetwork(userNetwork, ethNetwork))

      invitesContract = InvitesAbi__factory.connect(
        import.meta.env.VITE_INVITES_CONTRACT_ADDRESS as string,
        provider.getSigner(0)
      )

      await this.handleAccountChanged()
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

  private async handleAccountChanged() {
    if (!provider) return

    this.ethLoading = true
    const accounts = await provider.listAccounts()

    if (accounts.length === 0) {
      this.accounts = []
    } else {
      this.accounts = accounts
    }

    this.ethLoading = false
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', () => {
      void this.handleAccountChanged()
    })
    provider.on('disconnect', () => {
      void this.handleAccountChanged()
    })

    provider.on('stop', () => {
      void this.handleAccountChanged()
    })
    provider.on('chainChanged', async () => {
      this.accounts = []
      await this.onConnect()
    })
  }

  private clearData() {
    configuredModal.clearCachedProvider()
    this.accounts = []
  }
}

export default proxy(new EthStore()).makePersistent()
