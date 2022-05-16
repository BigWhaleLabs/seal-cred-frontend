import { proxy } from 'valtio'
import defaultProvider from 'helpers/defaultProvider'

interface EnsStoreInterface {
  ensNames: { [address: string]: Promise<string | null> }

  fetchEnsName: (address: string) => void
}

const EnsStore = proxy<EnsStoreInterface>({
  ensNames: {},

  fetchEnsName(address: string) {
    if (!EnsStore.ensNames[address]) {
      EnsStore.ensNames[address] = defaultProvider.lookupAddress(address)
    }
  },
})

export default EnsStore
