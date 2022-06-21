import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer from 'helpers/ContractSynchronizer'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'

interface ContractsStoreType {
  connectedAccounts: { [account: string]: ContractSynchronizer }
  contractsOwned: Promise<string[]>
  fetchMoreContractsOwned: (accountChange?: boolean) => Promise<void>
}

const ContractsStore = proxy<ContractsStoreType>({
  connectedAccounts: {},
  contractsOwned: Promise.resolve([]),
  async fetchMoreContractsOwned(accountChange?: boolean) {
    if (!WalletStore.account) {
      ContractsStore.contractsOwned = Promise.resolve([])
      return
    }

    if (!ContractsStore.connectedAccounts[WalletStore.account])
      ContractsStore.connectedAccounts[WalletStore.account] =
        new ContractSynchronizer(WalletStore.account)
    if (
      accountChange ||
      !ContractsStore.connectedAccounts[WalletStore.account] ||
      !ContractsStore.contractsOwned
    ) {
      ContractsStore.contractsOwned =
        ContractsStore.connectedAccounts[WalletStore.account].getOwnedERC721()
    } else {
      const oldContractsOwned = (await ContractsStore.contractsOwned) || []
      const newContractsOwned = await ContractsStore.connectedAccounts[
        WalletStore.account
      ].getOwnedERC721()
      ContractsStore.contractsOwned = Promise.resolve(
        Array.from(new Set([...oldContractsOwned, ...newContractsOwned]))
      )
    }
  },
})

subscribeKey(WalletStore, 'account', () =>
  ContractsStore.fetchMoreContractsOwned(true)
)

defaultProvider.on('block', () => ContractsStore.fetchMoreContractsOwned())

export default ContractsStore
