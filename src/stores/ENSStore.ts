import { proxy } from 'valtio'
import defaultProvider from 'helpers/defaultProvider'

interface ENSStoreInterface {
  ensNames: { [address: string]: Promise<string | null> }

  fetchtEnsName: (address: string) => void
}

const ENSStore = proxy<ENSStoreInterface>({
  ensNames: {},

  fetchtEnsName(address: string) {
    if (!ENSStore.ensNames[address]) {
      ENSStore.ensNames[address] = defaultProvider.lookupAddress(address)
    }
  },
})

export default ENSStore
