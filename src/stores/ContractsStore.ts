import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { providers } from 'ethers'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer, {
  ContractSynchronizerSchema,
} from 'helpers/ContractSynchronizer'
import Network from 'models/Network'
import PersistableStore from 'stores/persistence/PersistableStore'
import WalletStore from 'stores/WalletStore'
import transformObjectValues from 'helpers/transformObjectValues'

export class ContractsStore extends PersistableStore {
  connectedAccounts: { [account: string]: ContractSynchronizer } = {}
  currentBlock?: number
  addressToTokenIds?: Promise<{ [address: string]: string[] } | undefined>

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

  replacer = (key: string, value: unknown) => {
    const disallowList = ['addressToTokenIds', 'connectedAccounts']
    return disallowList.includes(key) ? undefined : value
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

  async fetchMoreContractsOwned(accountChange?: boolean) {
    if (!WalletStore.account) return
    if (!this.currentBlock) this.currentBlock = await this.fetchBlockNumber()

    if (!this.connectedAccounts[WalletStore.account])
      this.connectedAccounts[WalletStore.account] = new ContractSynchronizer(
        WalletStore.account
      )

    if (!this.addressToTokenIds || accountChange) {
      this.addressToTokenIds = this.connectedAccounts[
        WalletStore.account
      ].syncAddressToTokenIds(this.currentBlock, this.network)
    } else {
      const result = await this.connectedAccounts[
        WalletStore.account
      ].syncAddressToTokenIds(this.currentBlock, this.network)

      this.addressToTokenIds = Promise.resolve(result)
    }
  }
}

export const GoerliContractsStore = proxy(
  new ContractsStore(goerliDefaultProvider, Network.Goerli)
).makePersistent(true)

export const MainnetContractsStore = proxy(
  new ContractsStore(mainnetDefaultProvider, Network.Mainnet)
).makePersistent(true)

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
