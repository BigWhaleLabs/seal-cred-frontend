import { ContractsStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import Network from 'models/Network'
import WalletStore from 'stores/WalletStore'
import env from 'helpers/env'
import networks from 'networks'
import transformObjectValues from 'helpers/transformObjectValues'

const proxyNetworks = transformObjectValues(
  networks,
  ({ network, heavyProvider, defaultProvider }) =>
    proxy(
      new ContractsStore(defaultProvider, heavyProvider, network)
    ).makePersistent(env.VITE_ENCRYPT_KEY)
)

const ContractsNetworkStore = proxy({
  networks: proxyNetworks,
})

export const BadgesNetwork = Network.Goerli
export const BadgesContractsStore =
  ContractsNetworkStore.networks[BadgesNetwork]

subscribeKey(WalletStore, 'account', (account) => {
  if (account) {
    for (const network of Object.values(ContractsNetworkStore.networks)) {
      void network.fetchMoreContractsOwned(account, true)
    }
  }
})

for (const { defaultProvider, network } of Object.values(networks)) {
  defaultProvider.on('block', async (blockNumber: number) => {
    ContractsNetworkStore.networks[network].currentBlock = blockNumber
    if (!WalletStore.account) return
    await ContractsNetworkStore.networks[network].fetchMoreContractsOwned(
      WalletStore.account
    )
  })
}

export default ContractsNetworkStore
