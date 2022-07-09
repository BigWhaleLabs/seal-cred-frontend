import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/defaultProvider'
import { providers } from 'ethers'
import { proxy } from 'valtio'
import Network from 'models/Network'
import PersistableStore from 'stores/persistence/PersistableStore'

class ContractNamesStore extends PersistableStore {
  savedContractNames = {} as {
    [contractAddress: string]: string | undefined
  }

  requestedNames = {} as {
    [contractAddress: string]: Promise<string | undefined> | undefined
  }

  get contractNames() {
    return {
      ...this.savedContractNames,
      ...this.requestedNames,
    }
  }

  provider: providers.Provider

  constructor(provider: providers.Provider, persistanceSuffix: Network) {
    super()
    this.provider = provider
    this.persistanceName = `${this.constructor.name}${persistanceSuffix}`
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = ['requestedNames', 'contractNames']
    return disallowList.includes(key) ? undefined : value
  }

  fetchContractName(address: string) {
    if (this.contractNames[address]) {
      return
    }
    const contract = ERC721__factory.connect(address, this.provider)
    this.requestedNames[address] = contract
      .name()
      .then((result) => {
        this.savedContractNames[address] = result || address
        return result || address
      })
      .catch(() => {
        this.savedContractNames[address] = address
        return address
      })
  }
}

export const GoerliContractNamesStore = proxy(
  new ContractNamesStore(goerliDefaultProvider, Network.Goerli)
).makePersistent(true)
export const MainnetContractNamesStore = proxy(
  new ContractNamesStore(mainnetDefaultProvider, Network.Mainnet)
).makePersistent(true)
