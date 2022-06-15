import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import ContractNamesStore from 'stores/ContractNamesStore'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'
import getOwnedERC721 from 'helpers/getOwnedERC721'

interface ContractsStoreType {
  contractsOwnedState: { [token: string]: number }
  contractsOwnedStateAccount?: string
  contractsOwned: string[]
  lastBlockId?: number
  locked: boolean
  fetchContractsOwned: () => void
}

const ContractsStore = proxy<ContractsStoreType>({
  locked: false,
  contractsOwnedState: {},
  contractsOwned: [],
  async fetchContractsOwned() {
    if (ContractsStore.contractsOwnedStateAccount !== WalletStore.account) {
      ContractsStore.contractsOwnedStateAccount = WalletStore.account
      ContractsStore.lastBlockId = 0
      ContractsStore.contractsOwnedState = {}
      ContractsStore.contractsOwned = []
    }

    if (!ContractsStore.contractsOwnedStateAccount) return

    if (!ContractsStore.locked) {
      const currentBlockId = await defaultProvider.getBlockNumber()
      const currentState = await ContractsStore.contractsOwnedState
      ContractsStore.locked = true
      ContractsStore.contractsOwnedState = await getOwnedERC721(
        ContractsStore.contractsOwnedStateAccount,
        ContractsStore.lastBlockId ? ContractsStore.lastBlockId + 1 : 0,
        currentBlockId,
        currentState
      ).then((contracts) => {
        const addresses = Object.keys(contracts)
        for (const contract of addresses) {
          ContractNamesStore.fetchContractName(contract)
        }
        ContractsStore.locked = false
        return contracts
      })
      ContractsStore.contractsOwned = Object.keys(
        ContractsStore.contractsOwnedState
      )
      ContractsStore.lastBlockId = currentBlockId
    }
  },
})

subscribeKey(WalletStore, 'account', () => {
  ContractsStore.fetchContractsOwned()
})

defaultProvider.on('block', () => {
  ContractsStore.fetchContractsOwned()
})

export default ContractsStore
