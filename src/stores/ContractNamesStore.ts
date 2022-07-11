import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { proxy } from 'valtio'
import { reservedContractMetadata } from '@big-whale-labs/constants'
import Network from 'models/Network'
import PersistableStore from 'stores/persistence/PersistableStore'
import networkPick from 'helpers/networkPick'

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

  replacer = (key: string, value: unknown) => {
    const disallowList = ['requestedNames', 'contractNames']
    return disallowList.includes(key) ? undefined : value
  }

  fetchContractName(address: string, network: Network) {
    if (this.contractNames[address]) {
      return
    }
    if (reservedContractMetadata[address]) {
      this.savedContractNames[address] = reservedContractMetadata[address].name
      return
    }
    const contract = ERC721__factory.connect(
      address,
      networkPick(network, goerliDefaultProvider, mainnetDefaultProvider)
    )
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

export default proxy(new ContractNamesStore()).makePersistent(true)
