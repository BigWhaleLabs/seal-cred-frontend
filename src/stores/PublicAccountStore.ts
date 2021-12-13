import { Wallet, ethers } from 'ethers'
import { proxy } from 'valtio'
import Identity from 'models/Identity'
import PersistableStore from 'stores/persistence/PersistableStore'

class PublicAccountStore extends PersistableStore {
  mainEthWallet: Wallet = ethers.Wallet.createRandom()
  connectedIdentities: Identity[] = []

  reviver = (key: string, value: unknown) => {
    if (key === 'mainEthWallet') {
      const mainEthWalletValue = value as {
        address: string
        privateKey: string
      }
      return new ethers.Wallet(mainEthWalletValue.privateKey)
    }
    return value
  }

  replacer = (key: string, value: unknown) => {
    if (key === 'mainEthWallet') {
      const mainEthWalletValue = value as {
        address: string
        privateKey: string
      }
      return {
        address: mainEthWalletValue.address,
        privateKey: mainEthWalletValue.privateKey,
      }
    }
    return value
  }
}

export default proxy(new PublicAccountStore()).makePersistent()
