import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/defaultProvider'
import { providers } from 'ethers'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer from 'helpers/ContractSynchronizer'
import Network from 'models/Network'
import WalletStore from 'stores/WalletStore'

class ContractsStore {
  connectedAccounts: { [account: string]: ContractSynchronizer } = {}
  contractsOwned: Promise<string[]> = Promise.resolve([])
  currentBlock?: number

  provider: providers.Provider
  network: Network

  constructor(provider: providers.Provider, network: Network) {
    this.provider = provider
    this.network = network
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
      ].getOwnedERC721(this.currentBlock, this.network)
    } else {
      const oldContractsOwned = (await this.contractsOwned) || []
      const newContractsOwned = await this.connectedAccounts[
        WalletStore.account
      ].getOwnedERC721(this.currentBlock, this.network)
      this.contractsOwned = Promise.resolve(
        Array.from(new Set([...oldContractsOwned, ...newContractsOwned]))
      )
    }
  }
}

export const GoerliContractsStore = proxy(
  new ContractsStore(goerliDefaultProvider, Network.Goerli)
)
export const MainnetContractsStore = proxy(
  new ContractsStore(mainnetDefaultProvider, Network.Mainnet)
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
