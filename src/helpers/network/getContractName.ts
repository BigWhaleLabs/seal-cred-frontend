import { useSnapshot } from 'valtio'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import Network from 'models/Network'
import networks from 'networks'
import prettifyContractName from 'helpers/network/prettifyContractName'

export default function ({
  address,
  network,
  truncate,
  clearType,
}: {
  address: string
  network: Network
  truncate?: boolean
  clearType?: boolean
}) {
  const { contractNames } = useSnapshot(ContractMetadataStore)

  let contractName = contractNames[address]
  if (!contractName)
    ContractMetadataStore.fetchContractName(
      address,
      networks[network].defaultProvider
    )

  if (clearType && contractName)
    contractName = contractName.replace(/ (email|\(derivative\))$/, '')

  return prettifyContractName(contractName || address, truncate)
}
