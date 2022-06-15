import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import SealCredStore from 'stores/SealCredStore'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import WalletStore from 'stores/WalletStore'
import getTokenIdToOwnerMap from 'helpers/getTokenIdToOwnerMap'
import isOwned from 'helpers/isOwned'

interface DerivativeContractsStoreType {
  contractsToIsOwnedMap: { [contractAddress: string]: Promise<boolean> }
  contractsToOwnersMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }
  fetchContractsToIsOwnedMap: () => void
  fetchContractsToOwnersMaps: () => void
}

const DerivativeContractsStore = proxy<DerivativeContractsStoreType>({
  contractsToIsOwnedMap: {},
  contractsToOwnersMaps: {},
  async fetchContractsToIsOwnedMap() {
    if (!WalletStore.account) return
    const derivativeContracts = Object.values(await SealCredStore.ledger).map(
      ({ derivativeContract }) => derivativeContract
    )
    for (const contract of derivativeContracts) {
      DerivativeContractsStore.contractsToIsOwnedMap[contract.address] =
        isOwned(contract, WalletStore.account)
    }
  },
  async fetchContractsToOwnersMaps() {
    const derivativeContracts = Object.values(await SealCredStore.ledger).map(
      ({ derivativeContract }) => derivativeContract
    )
    for (const derivativeContract of derivativeContracts) {
      DerivativeContractsStore.contractsToOwnersMaps[
        derivativeContract.address
      ] = getTokenIdToOwnerMap(derivativeContract)
    }
  },
})

subscribeKey(WalletStore, 'account', () => {
  DerivativeContractsStore.fetchContractsToIsOwnedMap()
  DerivativeContractsStore.fetchContractsToOwnersMaps()
})

export default DerivativeContractsStore
