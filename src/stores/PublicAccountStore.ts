import { Wallet, ethers } from 'ethers'
import { proxy } from 'valtio'
import ConnectedIdentity from 'models/ConnectedIdentity'
import PersistableStore from 'stores/persistence/PersistableStore'
import PublicBadge from 'models/PublicBadge'

class PublicAccountStore extends PersistableStore {
  mainEthWallet: Wallet = ethers.Wallet.createRandom()
  connectedIdentities: ConnectedIdentity[] = []
  loading = false
  publicBadges: PublicBadge[] = []

  reviver = (key: string, value: unknown) => {
    switch (key) {
      case 'mainEthWallet': {
        const mainEthWalletValue = value as {
          address: string
          privateKey: string
        }
        return new ethers.Wallet(mainEthWalletValue.privateKey)
      }
      case 'loading':
        return undefined
      case 'publicBadges':
        return undefined
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
      case 'loading':
        return false
      case 'publicBadges':
        return []
      default:
        return value
    }
  }
}

export default proxy(new PublicAccountStore()).makePersistent(true)
