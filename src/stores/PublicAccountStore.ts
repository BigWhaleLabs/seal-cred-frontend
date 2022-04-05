import { DerivativeAbi__factory } from 'helpers/derivativeAbi'
import { Wallet, providers, utils } from 'ethers'
import { proxy } from 'valtio'
import EthStore from 'stores/EthStore'
import OwnerToken from 'models/OwnerToken'
import PersistableStore from 'stores/persistence/PersistableStore'

// @Todo: set invites contract to `VITE_INVITES_CONTRACT_ADDRESS`
const network = import.meta.env.VITE_ETH_NETWORK as string
const invitesContract = import.meta.env.VITE_DOSU_INVITE_CONTRACT as string
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
    const decoder = new utils.AbiCoder()

    const tokens: OwnerToken[] = (
      await provider.getLogs({
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
          utils.id('Transfer(address,address,uint256)'),
          null,
          utils.hexZeroPad(ethAddress, 32),
        ],
      })
    ).map((log) => {
      const {
        address: contract,
        transactionHash: transaction,
        transactionIndex: transactionId,
      } = log
      const from = decoder.decode(['address'], log.topics[1]).toString()
      const to = decoder.decode(['address'], log.topics[2]).toString()
      return { contract: contract, from, to, transaction, transactionId }
    })

    return tokens
  }

  async checkInviteToken(ethAddress: string) {
    const contractsForCheck = [invitesContract]
    const tokens = (await this.listTokensOfOwner(ethAddress)).filter((token) =>
      contractsForCheck.includes(token.contract)
    )

    const owned: { [index: string]: number } = {}

    for (const token of tokens) {
      switch (token.contract) {
        case invitesContract: {
          const tokenId = await EthStore.getTokenId()
          if (tokenId && tokenId > 0) {
            owned['dosu1wave'] = tokenId
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
