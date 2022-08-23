import { useSnapshot } from 'valtio'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import Network from 'models/Network'
import networks from 'networks'
import prettifyContractName from 'helpers/network/prettifyContractName'

export default function (address: string, network: Network, truncate = false) {
  const { contractNames } = useSnapshot(ContractMetadataStore)

  const contractName = contractNames[address]
  if (!contractName)
    ContractMetadataStore.fetchContractName(
      address,
      networks[network].defaultProvider
    )

  return prettifyContractName(contractName || address, truncate)
}
