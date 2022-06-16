import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import AccountOwnedERC721 from 'helpers/AccountOwnedERC721'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'

interface ContractsStoreType {
  contractsOwned: string[]
  fetchMoreContractsOwned: () => void
}

const connectedAccounts: { [account: string]: AccountOwnedERC721 } = {}

const OriginalContractsStore = proxy<ContractsStoreType>({
  contractsOwned: [],
  async fetchMoreContractsOwned() {
    if (!WalletStore.account) {
      OriginalContractsStore.contractsOwned = []
      return
    }

    if (!connectedAccounts[WalletStore.account])
      connectedAccounts[WalletStore.account] = new AccountOwnedERC721(
        WalletStore.account
      )

    OriginalContractsStore.contractsOwned = await connectedAccounts[
      WalletStore.account
    ].getOwnedERC721()
  },
})

subscribeKey(WalletStore, 'account', () => {
  OriginalContractsStore.fetchMoreContractsOwned()
})

defaultProvider.on('block', () => {
  OriginalContractsStore.fetchMoreContractsOwned()
})

export default OriginalContractsStore
