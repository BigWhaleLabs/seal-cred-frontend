import { Wallet, ethers } from 'ethers'
import { getPublicTokens } from 'helpers/api'
import { proxy } from 'valtio'
import ConnectedIdentity from 'models/ConnectedIdentity'
import PersistableStore from 'stores/persistence/PersistableStore'
import PublicBadge from 'models/PublicBadge'

type LinkedTokenObject = {
  identityType: string
  type: string
  updatedAt: number
}
interface LinkedToken extends LinkedTokenObject {
  identifier: string
}

type LinkedTokenMap = {
  [identifier: string]: LinkedTokenObject
}

class PublicAccountStore extends PersistableStore {
  mainEthWallet: Wallet = ethers.Wallet.createRandom()
  connectedIdentities: ConnectedIdentity[] = []
  loading = false
  publicBadges: PublicBadge[] = []
  linked: LinkedTokenMap = {}

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

  async fetchPublicBadges(address?: string) {
    this.loading = true
    try {
      this.publicBadges = await getPublicTokens(
        address || this.mainEthWallet.address
      )
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }

  addLinkedToken({ identifier, identityType, type, updatedAt }: LinkedToken) {
    const linkedArray = Object.entries(this.linked)
    const time = linkedArray[0][1].updatedAt || updatedAt
    this.linked[identifier] = { identityType, type, updatedAt: time }
  }

  removeLinkedToken(identifier: string) {
    delete this.linked[identifier]
  }
}

export default proxy(new PublicAccountStore()).makePersistent()
