import { BigNumber } from 'ethers'
import { SCERC721Derivative__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import ProofResponse from 'models/ProofResponse'
import WalletsToNotifiedOfBeingDoxxed from 'models/WalletsToNotifiedOfBeingDoxxed'
import env from 'helpers/env'
import handleError, { ErrorList } from 'helpers/handleError'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore {
  account?: string
  walletLoading = false
  walletsToNotifiedOfBeingDoxxed: WalletsToNotifiedOfBeingDoxxed = {}

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
    derivativeContractAddress: string,
    proofResult: ProofResponse
  ) {
    if (!provider) {
      throw new Error('No provider found')
    }
    if (!this.account) {
      throw new Error('No account found')
    }
    const derivativeContract = SCERC721Derivative__factory.connect(
      derivativeContractAddress,
      provider.getSigner(0)
    )
    // This is a hacky way to get rid of the third arguments that are unnecessary and convert to BigNumber
    const tx = await derivativeContract.mint(
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
      [
        BigNumber.from(proofResult.publicSignals[0]),
        BigNumber.from(proofResult.publicSignals[1]),
      ]
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

const exportedStore = proxy(new WalletStore())

if (exportedStore.cachedProvider) void exportedStore.connect()

export default exportedStore
