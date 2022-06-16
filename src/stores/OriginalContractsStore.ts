import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import WalletStore from 'stores/WalletStore'
import defaultProvider from 'helpers/defaultProvider'
import getOwnedERC721 from 'helpers/getOwnedERC721'

interface ContractsStoreType {
  contractsOwned: string[]
  fetchMoreContractsOwned: () => void
}

let locked = false
let lastBlockId: number | undefined = 0
let contractsOwnedState: { [token: string]: number } = {}
let currentAccount: string | undefined

const OriginalContractsStore = proxy<ContractsStoreType>({
  contractsOwned: [],
  async fetchMoreContractsOwned() {
    if (currentAccount !== WalletStore.account) {
      currentAccount = WalletStore.account
      lastBlockId = 0
      contractsOwnedState = {}
      OriginalContractsStore.contractsOwned = []
    }

    if (!currentAccount) return

    if (!locked) {
      locked = true
      try {
        const currentBlockId = await defaultProvider.getBlockNumber()
        contractsOwnedState = await getOwnedERC721(
          currentAccount,
          lastBlockId,
          currentBlockId,
          contractsOwnedState
        )
        lastBlockId = currentBlockId + 1
        OriginalContractsStore.contractsOwned = Object.keys(contractsOwnedState)
      } finally {
        locked = false
      }
    }
  },
})

subscribeKey(WalletStore, 'account', () => {
  OriginalContractsStore.fetchMoreContractsOwned()
})

defaultProvider.on('block', () => {
  OriginalContractsStore.fetchMoreContractsOwned()
})

export default OriginalContractsStore
