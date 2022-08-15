import { ContractsStore } from '@big-whale-labs/stores'
import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import {
  goerliHeavyProvider,
  mainnetHeavyProvider,
} from 'helpers/providers/heavyProvider'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import Network from 'models/Network'
import WalletStore from 'stores/WalletStore'
import env from 'helpers/env'

export const GoerliContractsStore = proxy(
  new ContractsStore(goerliDefaultProvider, goerliHeavyProvider, Network.Goerli)
).makePersistent(env.VITE_ENCRYPT_KEY)

export const MainnetContractsStore = proxy(
  new ContractsStore(
    mainnetDefaultProvider,
    mainnetHeavyProvider,
    Network.Mainnet
  )
).makePersistent(env.VITE_ENCRYPT_KEY)

subscribeKey(WalletStore, 'account', (account) => {
  if (account) {
    void GoerliContractsStore.fetchMoreContractsOwned(account, true)
    void MainnetContractsStore.fetchMoreContractsOwned(account, true)
  }
})

goerliDefaultProvider.on('block', async (blockNumber: number) => {
  GoerliContractsStore.currentBlock = blockNumber
  if (WalletStore.account) {
    await GoerliContractsStore.fetchMoreContractsOwned(WalletStore.account)
  }
})
mainnetDefaultProvider.on('block', async (blockNumber: number) => {
  MainnetContractsStore.currentBlock = blockNumber
  if (WalletStore.account) {
    await MainnetContractsStore.fetchMoreContractsOwned(WalletStore.account)
  }
})

export default ContractsStore
