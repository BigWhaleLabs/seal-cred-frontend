import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import defaultProvider from 'helpers/defaultProvider'

class ContractNamesStore extends PersistableStore {
  savedContractNames = {} as {
    [contractAddress: string]: string | undefined
  }

  requestedNames = {} as {
    [contractAddress: string]: Promise<string | undefined> | undefined
  }

  get contractNames() {
    return {
      ...this.requestedNames,
      ...this.savedContractNames,
    }
  }

  replacer = (key: string, value: unknown) => {
    const disallowList = ['requestedNames', 'contractNames']
    return disallowList.includes(key) ? undefined : value
  }

  fetchContractName(address: string) {
    if (this.contractNames[address]) {
      return
    }
    const contract = ERC721__factory.connect(address, defaultProvider)
    this.requestedNames[address] = contract.name().then((result) => {
      this.savedContractNames[address] = result
      return result
    })
  }
}

export default proxy(new ContractNamesStore()).makePersistent(true)
