import { proxy } from 'valtio'
import defaultProvider from 'helpers/defaultProvider'

interface ENSStoreInterface {
  ensNames: { [address: string]: Promise<string | null> }

  fetchEnsName: (address: string) => void
}

const ENSStore = proxy<ENSStoreInterface>({
  ensNames: {},

  fetchEnsName(address: string) {
    if (!ENSStore.ensNames[address]) {
      ENSStore.ensNames[address] = defaultProvider.lookupAddress(address)
    }
  },
})

export default ENSStore
