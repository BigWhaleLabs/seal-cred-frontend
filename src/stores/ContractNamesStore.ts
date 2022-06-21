import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import defaultProvider from 'helpers/defaultProvider'

interface ContractNamesStoreType {
  contractNames: {
    [contractAddress: string]: string | undefined
  }
  fetchContractName: (address: string) => void
}

const ContractNamesStore = proxy<ContractNamesStoreType>({
  contractNames: {},
  async fetchContractName(address: string) {
    if (ContractNamesStore.contractNames[address]) {
      return
    }
    const contract = ERC721__factory.connect(address, defaultProvider)
    ContractNamesStore.contractNames[address] = await contract.name()
  },
})

export default ContractNamesStore
