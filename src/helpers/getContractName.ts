import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { useSnapshot } from 'valtio'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import Network from 'models/Network'
import networkPick from 'helpers/networkPick'

export default function (address: string, network: Network, onlyName = false) {
  const { contractNames } = useSnapshot(ContractMetadataStore)
  const contractName = contractNames[address]
  if (!contractName)
    ContractMetadataStore.fetchContractName(
      address,
      networkPick(network, goerliDefaultProvider, mainnetDefaultProvider)
    )

  if (onlyName) return contractName
  return contractName || address
}
