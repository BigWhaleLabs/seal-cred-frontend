import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
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

const OriginalContractsStore = proxy<ContractsStoreType>({
  locked: false,
  contractsOwnedState: {},
  contractsOwned: [],
  async fetchContractsOwned() {
    if (
      OriginalContractsStore.contractsOwnedStateAccount !== WalletStore.account
    ) {
      OriginalContractsStore.contractsOwnedStateAccount = WalletStore.account
      OriginalContractsStore.lastBlockId = 0
      OriginalContractsStore.contractsOwnedState = {}
      OriginalContractsStore.contractsOwned = []
    }

    if (!OriginalContractsStore.contractsOwnedStateAccount) return

    if (!OriginalContractsStore.locked) {
      const currentBlockId = await defaultProvider.getBlockNumber()
      const currentState = await OriginalContractsStore.contractsOwnedState
      OriginalContractsStore.locked = true
      OriginalContractsStore.contractsOwnedState = await getOwnedERC721(
        OriginalContractsStore.contractsOwnedStateAccount,
        OriginalContractsStore.lastBlockId
          ? OriginalContractsStore.lastBlockId + 1
          : 0,
        currentBlockId,
        currentState
      )
      OriginalContractsStore.locked = false
      OriginalContractsStore.contractsOwned = Object.keys(
        OriginalContractsStore.contractsOwnedState
      )
      OriginalContractsStore.lastBlockId = currentBlockId
    }
  },
})

subscribeKey(WalletStore, 'account', () => {
  OriginalContractsStore.fetchContractsOwned()
})

defaultProvider.on('block', () => {
  OriginalContractsStore.fetchContractsOwned()
})

export default OriginalContractsStore
