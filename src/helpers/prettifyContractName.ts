import { utils } from 'ethers'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

export default function (contractName: string, truncate = false) {
  if (truncate) contractName = truncateMiddleIfNeeded(contractName, 17)
  if (utils.isAddress(contractName))
    contractName = truncateMiddleIfNeeded(contractName, 17)

  // Removes NULL symbols caused by Solidity -> JS string conversion
  contractName = contractName.replaceAll('\u0000', '')
  return contractName
}
