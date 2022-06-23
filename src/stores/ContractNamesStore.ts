import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import defaultProvider from 'helpers/defaultProvider'

interface ContractNamesStoreType {
  contractNames: {
    [contractAddress: string]: Promise<string | undefined> | undefined
  }
  fetchContractName: (address: string) => void
}

const ContractNamesStore = proxy<ContractNamesStoreType>({
  contractNames: {},
  fetchContractName(address: string) {
    if (ContractNamesStore.contractNames[address]) {
      return
    }
    const contract = ERC721__factory.connect(address, defaultProvider)
    ContractNamesStore.contractNames[address] = contract.name()
  },
})

export default ContractNamesStore
