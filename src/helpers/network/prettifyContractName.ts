import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { utils } from 'ethers'

export default function (contractName: string, truncate = false) {
  if (truncate) contractName = truncateMiddleIfNeeded(contractName, 17)
  if (utils.isAddress(contractName))
    contractName = truncateMiddleIfNeeded(contractName, 17)

  // Removes \0 caused by old versions of the contracts
  contractName = contractName.replaceAll('\u0000', '')
  return contractName
}
