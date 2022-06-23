import { ERC721__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import defaultProvider from 'helpers/defaultProvider'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

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
    ContractNamesStore.contractNames[address] = contract.callStatic
      .name()
      .catch(() => {
        return truncateMiddleIfNeeded(address, 17)
      })
  },
})

export default ContractNamesStore
