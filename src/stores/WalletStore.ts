import { BigNumber } from 'ethers'
import {
  SealCredERC721Ledger,
  SealCredERC721Ledger__factory,
  SealCredEmailLedger,
  SealCredEmailLedger__factory,
} from '@upacyxou/test-contract'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResult from 'models/ProofResult'
import env from 'helpers/env'
import handleError, { ErrorList } from 'helpers/handleError'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore extends PersistableStore {
  account?: string
  walletLoading = false
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
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== env.VITE_ETH_NETWORK && env.VITE_ETH_NETWORK)
        throw new Error(
          ErrorList.wrongNetwork(userNetwork, env.VITE_ETH_NETWORK)
        )
      this.account = (await provider.listAccounts())[0]
      this.subscribeProvider(instance)
    } catch (error) {
      if (error !== 'Modal closed by user') {
        handleError(error)
        this.clearData()
      }
    } finally {
      this.walletLoading = false
    }
  }

  async signMessage(message: string) {
    if (!provider) throw new Error('No provider')

    this.walletLoading = true
    try {
      const signer = provider.getSigner()
      const signature = await signer.signMessage(message)
      return signature
    } finally {
      this.walletLoading = false
    }
  }

  async mintDerivative(
    proofResult: ProofResult,
    originalContractAddress?: string,
    domain?: string
  ) {
    if (!provider) {
      throw new Error('No provider found')
    }
    if (!this.account) {
      throw new Error('No account found')
    }

    const domainOrContract = domain || originalContractAddress

    if (!domainOrContract) return

    const ledgerWithSigner = domain
      ? SealCredEmailLedger__factory.connect(
          env.VITE_SCWPLEDGER_CONTRACT_ADDRESS,
          provider.getSigner(0)
        )
      : SealCredERC721Ledger__factory.connect(
          env.VITE_SCLEDGER_CONTRACT_ADDRESS,
          provider.getSigner(0)
        )

    // This is a hacky way to get rid of the third arguments that are unnecessary and convert to BigNumber
    // Also pay attention to array indexes
    const tx = await ledgerWithSigner.mint(
      domainOrContract,
      [
        BigNumber.from(proofResult.proof.pi_a[0]),
        BigNumber.from(proofResult.proof.pi_a[1]),
      ],
      [
        [
          BigNumber.from(proofResult.proof.pi_b[0][1]),
          BigNumber.from(proofResult.proof.pi_b[0][0]),
        ],
        [
          BigNumber.from(proofResult.proof.pi_b[1][1]),
          BigNumber.from(proofResult.proof.pi_b[1][0]),
        ],
      ],
      [
        BigNumber.from(proofResult.proof.pi_c[0]),
        BigNumber.from(proofResult.proof.pi_c[1]),
      ],
      proofResult.publicSignals.map(BigNumber.from)
    )
    await tx.wait()
  }

  private async handleAccountChanged() {
    if (!provider) return

    this.walletLoading = true
    const accounts = await provider.listAccounts()
    this.account = accounts[0]
    this.walletLoading = false
  }

  private subscribeProvider(provider: Web3Provider) {
    if (!provider.on) return

    provider.on('error', (error: Error) => {
      handleError(error)
    })

    provider.on('accountsChanged', (accounts: string[]) => {
      accounts.length ? void this.handleAccountChanged() : this.clearData()
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
    web3Modal.clearCachedProvider()
    this.account = undefined
  }
}

const walletStore = proxy(new WalletStore()).makePersistent(true)

if (walletStore.cachedProvider) void walletStore.connect()

export default walletStore
