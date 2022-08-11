import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { useSnapshot } from 'valtio'
import ContractNamesStore from 'stores/ContractNamesStore'
import Network from 'models/Network'
import networkPick from 'helpers/networkPick'

export default function (address: string, network: Network, onlyName = false) {
  const { contractNames } = useSnapshot(ContractNamesStore)
  const contractName = contractNames[address]
  if (!contractName)
    ContractNamesStore.fetchContractName(
      address,
      networkPick(network, goerliDefaultProvider, mainnetDefaultProvider)
    )

  if (onlyName) return contractName
  return contractName || address
}
