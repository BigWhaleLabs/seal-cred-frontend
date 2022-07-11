import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { providers } from 'ethers'
import { proxyWithComputed, subscribeKey } from 'valtio/utils'
import ContractSynchronizer, {
  ContractSynchronizerSchema,
} from 'helpers/ContractSynchronizer'
import Network from 'models/Network'
import PersistableStore from 'stores/persistence/PersistableStore'
import WalletStore from 'stores/WalletStore'
import transformObjectValues from 'helpers/transformObjectValues'

class ContractsStore extends PersistableStore {
  connectedAccounts: { [account: string]: ContractSynchronizer } = {}
  currentBlock?: number

  get persistanceName() {
    return `${this.constructor.name}_${this.network}`
  }

  provider: providers.Provider
  network: Network

  constructor(provider: providers.Provider, network: Network) {
    super()
    this.provider = provider
    this.network = network
  }

  reviver = (key: string, value: unknown) => {
    if (key === 'connectedAccounts') {
      return transformObjectValues(
        value as { [account: string]: ContractSynchronizerSchema },
        ContractSynchronizer.fromJSON
      )
    }
    return value
  }

  fetchBlockNumber() {
    return this.provider.getBlockNumber()
  }

  async fetchMoreContractsOwned() {
    if (!WalletStore.account) return
    if (!this.currentBlock) this.currentBlock = await this.fetchBlockNumber()

    if (!this.connectedAccounts[WalletStore.account])
      this.connectedAccounts[WalletStore.account] = new ContractSynchronizer(
        WalletStore.account
      )

    await this.connectedAccounts[WalletStore.account].getOwnedERC721(
      this.currentBlock,
      this.network
    )
  }
}

export const GoerliContractsStore = proxyWithComputed(
  new ContractsStore(goerliDefaultProvider, Network.Goerli),
  {
    contractsOwned: (state) =>
      WalletStore.account && state.connectedAccounts[WalletStore.account]
        ? state.connectedAccounts[WalletStore.account].contractsOwned
        : [],
  }
).makePersistent(true)

export const MainnetContractsStore = proxyWithComputed(
  new ContractsStore(mainnetDefaultProvider, Network.Mainnet),
  {
    contractsOwned: (state) =>
      WalletStore.account && state.connectedAccounts[WalletStore.account]
        ? state.connectedAccounts[WalletStore.account].contractsOwned
        : [],
  }
).makePersistent(true)

subscribeKey(WalletStore, 'account', () => {
  void GoerliContractsStore.fetchMoreContractsOwned()
  void MainnetContractsStore.fetchMoreContractsOwned()
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
