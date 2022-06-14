import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractNamesStore from 'stores/ContractNamesStore'
import WalletStore from 'stores/WalletStore'
import getOwnedERC721 from 'helpers/getOwnedERC721'

interface ContractsStoreType {
  contractsOwned: Promise<string[]>
  fetchContractsOwned: () => void
}

const ContractsStore = proxy<ContractsStoreType>({
  contractsOwned: Promise.resolve([]),
  fetchContractsOwned() {
    ContractsStore.contractsOwned = WalletStore.account
      ? getOwnedERC721(WalletStore.account).then((contracts) => {
          for (const contract of contracts) {
            ContractNamesStore.fetchContractName(contract)
          }
          return contracts
        })
      : Promise.resolve([])
  },
})

subscribeKey(WalletStore, 'account', () => {
  ContractsStore.fetchContractsOwned()
})

export default ContractsStore
