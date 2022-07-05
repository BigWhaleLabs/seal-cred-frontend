import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer from 'helpers/ContractSynchronizer'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'

interface ContractsStoreType {
  connectedAccounts: { [account: string]: ContractSynchronizer }
  contractsOwned: Promise<string[]>
  fetchMoreContractsOwned: (
    blockNumber: number,
    accountChange?: boolean
  ) => Promise<void>
}

const ContractsStore = proxy<ContractsStoreType>({
  connectedAccounts: {},
  contractsOwned: Promise.resolve([]),
  async fetchMoreContractsOwned(blockNumber: number, accountChange?: boolean) {
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
        ContractsStore.connectedAccounts[WalletStore.account].getOwnedERC721(
          blockNumber
        )
    } else {
      const oldContractsOwned = (await ContractsStore.contractsOwned) || []
      const newContractsOwned = await ContractsStore.connectedAccounts[
        WalletStore.account
      ].getOwnedERC721(blockNumber)
      ContractsStore.contractsOwned = Promise.resolve(
        Array.from(new Set([...oldContractsOwned, ...newContractsOwned]))
      )
    }
  },
})

subscribeKey(WalletStore, 'account', async () => {
  const blockNumber = await defaultProvider.getBlockNumber()
  return ContractsStore.fetchMoreContractsOwned(blockNumber, true)
})

defaultProvider.on('block', (blockNumber: number) =>
  ContractsStore.fetchMoreContractsOwned(blockNumber)
)

export default ContractsStore
