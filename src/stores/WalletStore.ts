import { BigNumber } from 'ethers'
import { ErrorList, handleError } from 'helpers/handleError'
import { SCERC721Derivative__factory } from '@big-whale-labs/street-cred-ledger-contract'
import { Web3Provider } from '@ethersproject/providers'
import { proxy } from 'valtio'
import ProofResponse from 'models/ProofResponse'
import StreetCredStore from 'stores/StreetCredStore'
import env from 'helpers/env'
import web3Modal from 'helpers/web3Modal'

let provider: Web3Provider

class WalletStore {
  account?: string
  walletLoading = false

  async connect(clearCachedProvider = false) {
    this.walletLoading = true
    try {
      if (clearCachedProvider) web3Modal.clearCachedProvider()

      const instance = await web3Modal.connect()
      provider = new Web3Provider(instance)
      const userNetwork = (await provider.getNetwork()).name
      if (userNetwork !== env.VITE_ETH_NETWORK)
        throw new Error(
          ErrorList.wrongNetwork(userNetwork, env.VITE_ETH_NETWORK)
        )
      await this.handleAccountChanged()
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

  async signMessage(forAddress?: string) {
    if (!provider) throw new Error('No provider')

    this.walletLoading = true
    try {
      const signer = provider.getSigner()
      const signature = await signer.signMessage(
        forAddress ? forAddress : await signer.getAddress()
      )
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
    this.account = (await provider.listAccounts())[0]
    this.walletLoading = false

    await StreetCredStore.handleAccountChange(this.account)
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
      this.account = undefined
      await this.connect()
    })
  }

  private clearData() {
    web3Modal.clearCachedProvider()
    this.account = undefined
  }
}

export default proxy(new WalletStore())
