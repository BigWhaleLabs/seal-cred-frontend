import { goerliDefaultProvider } from 'helpers/defaultProvider'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer from 'helpers/ContractSynchronizer'
import WalletStore from 'stores/WalletStore'

interface ContractsStoreType {
  connectedAccounts: { [account: string]: ContractSynchronizer }
  contractsOwned: Promise<string[]>
  currentBlock?: number
  fetchBlockNumber: () => Promise<number>
  fetchMoreContractsOwned: (accountChange?: boolean) => Promise<void>
}

const ContractsStore = proxy<ContractsStoreType>({
  connectedAccounts: {},
  contractsOwned: Promise.resolve([]),
  currentBlock: undefined,

  fetchBlockNumber() {
    return goerliDefaultProvider.getBlockNumber()
  },
  async fetchMoreContractsOwned(accountChange) {
    if (!ContractsStore.currentBlock)
      ContractsStore.currentBlock = await ContractsStore.fetchBlockNumber()

    if (!WalletStore.account) {
      ContractsStore.contractsOwned = Promise.resolve([])
      return
    }

    console.log(ContractsStore.currentBlock)

    if (!ContractsStore.connectedAccounts[WalletStore.account])
      ContractsStore.connectedAccounts[WalletStore.account] =
        new ContractSynchronizer(WalletStore.account)
    if (
      accountChange ||
      !ContractsStore.connectedAccounts[WalletStore.account] ||
      !ContractsStore.contractsOwned
    ) {
      ContractsStore.contractsOwned = ContractsStore.connectedAccounts[
        WalletStore.account
      ].getOwnedERC721(ContractsStore.currentBlock)
    } else {
      const oldContractsOwned = (await ContractsStore.contractsOwned) || []
      const newContractsOwned = await ContractsStore.connectedAccounts[
        WalletStore.account
      ].getOwnedERC721(ContractsStore.currentBlock)
      ContractsStore.contractsOwned = Promise.resolve(
        Array.from(new Set([...oldContractsOwned, ...newContractsOwned]))
      )
    }
  },
})

subscribeKey(WalletStore, 'account', () =>
  ContractsStore.fetchMoreContractsOwned(true)
)

goerliDefaultProvider.on('block', async (blockNumber: number) => {
  ContractsStore.currentBlock = blockNumber
  await ContractsStore.fetchMoreContractsOwned()
})

export default ContractsStore
