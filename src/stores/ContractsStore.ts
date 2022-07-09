import { proxyWithComputed, subscribeKey } from 'valtio/utils'
import ContractSynchronizer, {
  ContractSynchronizerSchema,
} from 'helpers/ContractSynchronizer'
import PersistableStore from 'stores/persistence/PersistableStore'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'
import walletStore from 'stores/WalletStore'

class ContractsStore extends PersistableStore {
  connectedAccounts: { [account: string]: ContractSynchronizer } = {}
  currentBlock: undefined | number

  replacer = (key: string, value: unknown) => {
    const disallowList = [] as string[] // ['contractsOwned']
    return disallowList.includes(key) ? undefined : value
  }

  reviver = (key: string, value: unknown) => {
    if (key === 'connectedAccounts') {
      return Object.entries(
        value as { [account: string]: ContractSynchronizerSchema }
      ).reduce(
        (result, [account, state]) => ({
          ...result,
          [account]: ContractSynchronizer.fromJSON(state),
        }),
        {}
      )
    }
    return value
  }

  fetchBlockNumber() {
    return defaultProvider.getBlockNumber()
  }

  async fetchMoreContractsOwned() {
    if (!this.currentBlock) this.currentBlock = await this.fetchBlockNumber()

    if (!WalletStore.account) {
      return
    }

    if (!this.connectedAccounts[WalletStore.account]) {
      this.connectedAccounts[WalletStore.account] = new ContractSynchronizer(
        WalletStore.account
      )
    }

    await this.connectedAccounts[WalletStore.account].getOwnedERC721(
      this.currentBlock
    )
  }
}

const contractsStore = proxyWithComputed(new ContractsStore(), {
  contractsOwned: (state) =>
    walletStore.account && state.connectedAccounts[walletStore.account]
      ? state.connectedAccounts[walletStore.account].contractsOwned
      : [],
}).makePersistent()

subscribeKey(WalletStore, 'account', () =>
  contractsStore.fetchMoreContractsOwned()
)

defaultProvider.on('block', async (blockNumber: number) => {
  contractsStore.currentBlock = blockNumber
  await contractsStore.fetchMoreContractsOwned()
})

export default contractsStore
