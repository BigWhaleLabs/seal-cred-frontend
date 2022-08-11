import {
  goerliDefaultProvider,
  mainnetDefaultProvider,
} from 'helpers/providers/defaultProvider'
import { useSnapshot } from 'valtio'
import { utils } from 'ethers'
import ContractNamesStore from 'stores/ContractNamesStore'
import Network from 'models/Network'
import networkPick from 'helpers/networkPick'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

export default function (address: string, network: Network, truncate = false) {
  const { contractNames } = useSnapshot(ContractNamesStore)
  const contractName = contractNames[address]
  if (!contractName)
    ContractNamesStore.fetchContractName(
      address,
      networkPick(network, goerliDefaultProvider, mainnetDefaultProvider)
    )

  let content = contractName || address

  if (truncate) content = truncateMiddleIfNeeded(content, 17)
  if (utils.isAddress(content)) content = truncateMiddleIfNeeded(content, 17)

  // Removes NULL symbols caused by Solidity -> JS string conversion
  content = content.replaceAll('\u0000', '')
  return content
}
