import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer from 'helpers/ContractSynchronizer'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'

interface ContractsStoreType {
  contractsOwned: Promise<string[]>
  fetchMoreContractsOwned: (accountChange?: boolean) => Promise<void>
}

const connectedAccounts: { [account: string]: ContractSynchronizer } = {}

const OriginalContractsStore = proxy<ContractsStoreType>({
  contractsOwned: Promise.resolve([]),
  async fetchMoreContractsOwned(accountChange?: boolean) {
    if (!WalletStore.account) {
      OriginalContractsStore.contractsOwned = Promise.resolve([])
      return
    }

    if (!connectedAccounts[WalletStore.account])
      connectedAccounts[WalletStore.account] = new ContractSynchronizer(
        WalletStore.account
      )
    if (
      accountChange ||
      !connectedAccounts[WalletStore.account] ||
      !OriginalContractsStore.contractsOwned
    ) {
      OriginalContractsStore.contractsOwned =
        connectedAccounts[WalletStore.account].getOwnedERC721()
    } else {
      const oldContractsOwned =
        (await OriginalContractsStore.contractsOwned) || []
      const newContractsOwned = await connectedAccounts[
        WalletStore.account
      ].getOwnedERC721()
      OriginalContractsStore.contractsOwned = Promise.resolve(
        Array.from(new Set([...oldContractsOwned, ...newContractsOwned]))
      )
    }
  },
})

subscribeKey(WalletStore, 'account', () =>
  OriginalContractsStore.fetchMoreContractsOwned(true)
)

defaultProvider.on('block', () =>
  OriginalContractsStore.fetchMoreContractsOwned()
)

export default OriginalContractsStore
