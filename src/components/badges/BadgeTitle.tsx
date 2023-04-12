import { isAddress } from 'ethers/lib/utils'
import ContractName from 'components/ui/ContractName'
import ExternalLink from 'components/ui/ExternalLink'
import Network from 'models/Network'
import clearDerivativeType from 'helpers/network/clearDerivativeType'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

export default function ({
  clearType,
  originalOrAddress,
}: {
  originalOrAddress: string
  clearType?: boolean
}) {
  if (isAddress(originalOrAddress)) {
    return (
      <ExternalLink
        url={getEtherscanAddressUrl(originalOrAddress, Network.Goerli)}
      >
        <ContractName
          hyphens
          address={originalOrAddress}
          clearType={clearType}
          network={Network.Goerli}
        />
      </ExternalLink>
    )
  }

  return (
    <>
      @{clearType ? clearDerivativeType(originalOrAddress) : originalOrAddress}
    </>
  )
}
