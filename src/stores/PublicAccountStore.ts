import { DerivativeAbi__factory } from 'helpers/derivativeAbi'
import { Wallet, providers, utils } from 'ethers'
import { proxy } from 'valtio'
import OwnerToken from 'models/OwnerToken'
import PersistableStore from 'stores/persistence/PersistableStore'
import addressEquel from 'helpers/addressEquel'

const network = import.meta.env.VITE_ETH_NETWORK as string
const derivativeContractAddress = import.meta.env
  .VITE_SC_DERIVATIVE_ADDRESS as string
class PublicAccountStore extends PersistableStore {
  mainEthWallet: Wallet = Wallet.createRandom()

  private getContract() {
    const provider = new providers.InfuraProvider(
      network,
      import.meta.env.VITE_INFURA_ID as string
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

  async mintDerivative() {
    const derivativeContract = this.getContract()

    const transaction = await derivativeContract.mint()
    return await transaction.wait()
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

  async listTokensOfOwner(ethAddress: string) {
    const provider = new providers.InfuraProvider(
      network,
      import.meta.env.VITE_INFURA_ID as string
    )
    const iface = new utils.Interface([
      'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
    ])
    const sig = 'Transfer(address,address,uint256)'
    const sigHash = utils.keccak256(utils.toUtf8Bytes(sig))

    return (
      await provider.getLogs({
        fromBlock: 0,
        toBlock: 'latest',
        topics: [utils.id(sig), null, utils.hexZeroPad(ethAddress, 32)],
      })
    )
      .map((log) => {
        if (log.topics[0] !== sigHash) return null
        const data = log.data
        const topics = log.topics
        const result = iface.parseLog({ data, topics })
        return {
          contract: log.address,
          transaction: log.transactionHash,
          to: result.args.to,
          from: result.args.from,
          tokenId: result.args.tokenId.toString(),
        }
      })
      .filter((o) => o !== null) as OwnerToken[]
  }

  async checkInviteToken(ethAddress: string) {
    const contractsForCheck = [derivativeContractAddress]
    const tokens: OwnerToken[] = (
      await this.listTokensOfOwner(ethAddress)
    ).filter((token) => contractsForCheck.includes(token.contract))

    const owned: { [index: string]: string } = {}

    for (const token of tokens) {
      switch (token.contract) {
        case derivativeContractAddress: {
          const derivativeContract = this.getContract()
          const owner = await derivativeContract.ownerOf(token.tokenId)
          if (addressEquel(owner, ethAddress)) {
            owned['dosu1wave'] = token.tokenId
          }
          break
        }
        default:
          break
      }
    }
    return owned
  }
}

export default proxy(new PublicAccountStore()).makePersistent(true)
