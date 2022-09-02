import { AccentText } from 'components/ui/Text'
import ContractName from 'components/ui/ContractName'
import ExternalLink from 'components/ui/ExternalLink'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

export default function ContractNameByNetwork({
  address,
  network,
}: {
  address: string
  network: Network
}) {
  return (
    <ExternalLink url={getEtherscanAddressUrl(address, network)}>
      <AccentText bold color="text-secondary">
        <ContractName address={address} network={network} />
      </AccentText>
    </ExternalLink>
  )
}
