import { DerivativeAbi__factory } from 'helpers/abiTypes/derivativeAbi'
import { Wallet, providers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import ProofResponse from 'models/ProofResponse'
import addressEqual from 'helpers/addressEqual'

const network = import.meta.env.VITE_ETH_NETWORK as string
const provider = new providers.InfuraProvider(
  network,
  import.meta.env.VITE_INFURA_ID as string
)
class PublicAccountStore extends PersistableStore {
  mainEthWallet: Wallet = Wallet.createRandom()

  private getWalletWithProvider() {
    return new Wallet(this.mainEthWallet.privateKey, provider)
  }

  private getContract() {
    const walletWithProvider = this.getWalletWithProvider()

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
      default:
        return value
    }
  }

  async mintDerivative(proof: ProofResponse) {
    const derivativeContract = this.getContract()

    const transaction = await derivativeContract.mint(
      proof.proof.pi_a,
      proof.proof.pi_b,
      proof.proof.pi_c,
      proof.publicSignals
    )
    return transaction.wait()
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

  async checkAddressIsOwner(tokenId: string, ethAddress: string) {
    const derivativeContract = this.getContract()
    const owner = await derivativeContract.ownerOf(tokenId)
    return addressEqual(owner, ethAddress)
  }

  async getBalance() {
    const walletWithProvider = this.getWalletWithProvider()

    return formatEther(await walletWithProvider.getBalance())
  }
}

export default proxy(new PublicAccountStore()).makePersistent(true)
