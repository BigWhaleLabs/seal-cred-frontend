import { goerliDefaultProvider } from 'helpers/defaultProvider'
import { proxy } from 'valtio'

interface EnsStoreInterface {
  ensNames: { [address: string]: Promise<string | null> | undefined }
  fetchEnsName: (address: string) => void
}

const EnsStore = proxy<EnsStoreInterface>({
  ensNames: {},
  fetchEnsName(address: string) {
    if (EnsStore.ensNames[address]) {
      return
    }
    EnsStore.ensNames[address] = goerliDefaultProvider.lookupAddress(address)
  },
})

export default EnsStore
