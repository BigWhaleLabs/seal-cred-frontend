import { Wallet, ethers } from 'ethers'
import { proxy } from 'valtio'
import Identity from 'models/Identity'
import PersistableStore from 'stores/persistence/PersistableStore'

class PublicAccountStore extends PersistableStore {
  mainEthWallet: Wallet = ethers.Wallet.createRandom()
  connectedIdentities: Identity[] = []
}

export default proxy(new PublicAccountStore()).makePersistent()
