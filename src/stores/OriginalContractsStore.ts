import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import WalletStore from 'stores/WalletStore'
import getOwnedERC721 from 'helpers/getOwnedERC721'

interface ContractsStoreType {
  contractsOwned: Promise<string[]>
  fetchContractsOwned: () => void
}

const OriginalContractsStore = proxy<ContractsStoreType>({
  contractsOwned: getOwnedERC721(WalletStore.account),
  fetchContractsOwned() {
    OriginalContractsStore.contractsOwned = getOwnedERC721(WalletStore.account)
  },
})

subscribeKey(WalletStore, 'account', () => {
  OriginalContractsStore.fetchContractsOwned()
})

export default OriginalContractsStore
