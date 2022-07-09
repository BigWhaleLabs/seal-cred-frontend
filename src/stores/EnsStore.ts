import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/defaultProvider'
import { providers } from 'ethers'
import { proxy } from 'valtio'

class EnsStore {
  provider: providers.Provider
  ensNames: { [address: string]: Promise<string | null> | undefined } = {}

  constructor(provider: providers.Provider) {
    this.provider = provider
  }

  fetchEnsName(address: string) {
    if (this.ensNames[address]) {
      return
    }
    this.ensNames[address] = this.provider.lookupAddress(address)
  }
}

export const GoerliEnsStore = proxy(new EnsStore(goerliDefaultProvider))
export const MainnetEnsStore = proxy(new EnsStore(mainnetDefaultProvider))
