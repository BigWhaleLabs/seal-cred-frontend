import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/defaultProvider'
import { providers } from 'ethers'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer from 'helpers/ContractSynchronizer'
import WalletStore from 'stores/WalletStore'

class ContractsStore {
  connectedAccounts: { [account: string]: ContractSynchronizer } = {}
  contractsOwned: Promise<string[]> = Promise.resolve([])
  currentBlock?: number

  provider: providers.Provider

  constructor(provider: providers.Provider) {
    this.provider = provider
  }

  fetchBlockNumber() {
    return this.provider.getBlockNumber()
  }
  async fetchMoreContractsOwned(accountChange?: boolean) {
    if (!this.currentBlock) this.currentBlock = await this.fetchBlockNumber()

    if (!WalletStore.account) {
      this.contractsOwned = Promise.resolve([])
      return
    }

    if (!this.connectedAccounts[WalletStore.account])
      this.connectedAccounts[WalletStore.account] = new ContractSynchronizer(
        WalletStore.account
      )
    if (
      accountChange ||
      !this.connectedAccounts[WalletStore.account] ||
      !this.contractsOwned
    ) {
      this.contractsOwned = this.connectedAccounts[
        WalletStore.account
      ].getOwnedERC721(this.currentBlock)
    } else {
      const oldContractsOwned = (await this.contractsOwned) || []
      const newContractsOwned = await this.connectedAccounts[
        WalletStore.account
      ].getOwnedERC721(this.currentBlock)
      this.contractsOwned = Promise.resolve(
        Array.from(new Set([...oldContractsOwned, ...newContractsOwned]))
      )
    }
  }
}

export const GoerliContractsStore = proxy(
  new ContractsStore(goerliDefaultProvider)
)
export const MainnetContractsStore = proxy(
  new ContractsStore(mainnetDefaultProvider)
)

subscribeKey(WalletStore, 'account', () => {
  void GoerliContractsStore.fetchMoreContractsOwned(true)
  void MainnetContractsStore.fetchMoreContractsOwned(true)
})

goerliDefaultProvider.on('block', async (blockNumber: number) => {
  GoerliContractsStore.currentBlock = blockNumber
  await GoerliContractsStore.fetchMoreContractsOwned()
})
mainnetDefaultProvider.on('block', async (blockNumber: number) => {
  MainnetContractsStore.currentBlock = blockNumber
  await MainnetContractsStore.fetchMoreContractsOwned()
})

export default ContractsStore
