import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer from 'helpers/ContractSynchronizer'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'

interface ContractsStoreType {
  contractsOwned: Promise<string[]>
  fetchMoreContractsOwned: () => void
}

const connectedAccounts: { [account: string]: ContractSynchronizer } = {}

const OriginalContractsStore = proxy<ContractsStoreType>({
  contractsOwned: Promise.resolve([]),
  fetchMoreContractsOwned() {
    if (!WalletStore.account) {
      OriginalContractsStore.contractsOwned = Promise.resolve([])
      return
    }

    if (!connectedAccounts[WalletStore.account])
      connectedAccounts[WalletStore.account] = new ContractSynchronizer(
        WalletStore.account
      )

    OriginalContractsStore.contractsOwned =
      connectedAccounts[WalletStore.account].getOwnedERC721()
  },
})

subscribeKey(
  WalletStore,
  'account',
  OriginalContractsStore.fetchMoreContractsOwned
)

defaultProvider.on('block', OriginalContractsStore.fetchMoreContractsOwned)

export default OriginalContractsStore
