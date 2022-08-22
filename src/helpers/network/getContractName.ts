import { useSnapshot } from 'valtio'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import Network from 'models/Network'
import networks from 'networks'

export default function (address: string, network: Network, onlyName = false) {
  const { contractNames } = useSnapshot(ContractMetadataStore)
  const contractName = contractNames[address]
  if (!contractName)
    ContractMetadataStore.fetchContractName(
      address,
      networks[network].defaultProvider
    )

  if (onlyName) return contractName
  return contractName || address
}
