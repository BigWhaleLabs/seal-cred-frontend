import { Derivative_abi } from 'helpers/abiTypes'
import { Derivative_abi__factory } from 'helpers/abiTypes/factories/Derivative_abi__factory'
import { Web3Provider } from '@ethersproject/providers'
import { generateProof } from 'helpers/api'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import configuredModal from 'helpers/configuredModal'
import createInput from 'helpers/createInput'

let provider: Web3Provider
let contract: Derivative_abi

class EthStore extends PersistableStore {
  accounts: string[] | undefined = undefined
  ethLoading = false

  async onConnect() {
    try {
      this.ethLoading = true

      const instance = await configuredModal.connect()
      provider = new Web3Provider(instance)

      contract = Derivative_abi__factory.connect(
        import.meta.env.VITE_DERIVATIVE_ADDRESS as string,
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

  async signMessage() {
    if (!provider) return

    this.ethLoading = true
    const signer = provider.getSigner()
    const signature = await signer.signMessage(await signer.getAddress())
    this.ethLoading = false
    return signature
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

  async mint() {
    if (!this.accounts || !contract) return

    try {
      const transaction = await contract.mint()
      await transaction.wait()
    } catch (error) {
      console.error(error)
    }
  }

  async generateProof() {
    if (!this.accounts) return
    this.ethLoading = true
    try {
      const input = await createInput(this.accounts[0])

      await generateProof(input)
    } catch (error) {
      console.error(error)
    } finally {
      this.ethLoading = false
    }
  }
}

export default proxy(new EthStore()).makePersistent()
