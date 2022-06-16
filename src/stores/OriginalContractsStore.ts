import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractSynchronizer from 'helpers/ContractSynchronizer'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'

interface ContractsStoreType {
  contractsOwned: Promise<string[]>
  fetchMoreContractsOwned: () => void
}

const connectedAccounts: { [account: string]: ContractSynchronizer } = {}

function getOwnedContracts(account?: string) {
  if (!account) return Promise.resolve([])

  if (!connectedAccounts[account])
    connectedAccounts[account] = new ContractSynchronizer(account)

  return connectedAccounts[account].getOwnedERC721()
}

const OriginalContractsStore = proxy<ContractsStoreType>({
  contractsOwned: Promise.resolve([]), //getOwnedContracts(WalletStore.account),
  fetchMoreContractsOwned() {
    OriginalContractsStore.contractsOwned = getOwnedContracts(
      WalletStore.account
    )
  },
})

subscribeKey(
  WalletStore,
  'account',
  OriginalContractsStore.fetchMoreContractsOwned
)

defaultProvider.on('block', OriginalContractsStore.fetchMoreContractsOwned)

export default OriginalContractsStore
