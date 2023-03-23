import { useSnapshot } from 'valtio'
import ContractMetadataStore from 'stores/ContractMetadataStore'
import Network from 'models/Network'
import clearDerivativeType from 'helpers/network/clearDerivativeType'
import networks from 'networks'
import prettifyContractName from 'helpers/network/prettifyContractName'

export default function ({
  address,
  clearType,
  network,
  truncate,
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
    contractName = clearDerivativeType(contractName)

  return prettifyContractName(contractName || address, truncate)
}
