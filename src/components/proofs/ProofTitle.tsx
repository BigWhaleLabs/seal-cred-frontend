import { DataKey } from 'models/DataKey'
import { isAddress } from 'ethers/lib/utils'
import ContractName from 'components/ui/ContractName'
import ExternalLink from 'components/ui/ExternalLink'
import data from 'data'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

export default function ({
  original,
  type,
}: {
  original: string
  type: DataKey
}) {
  if (!isAddress(original)) return <>@{original}</>
  const network = data[type].network
  return (
    <ExternalLink url={getEtherscanAddressUrl(original, network)}>
      <ContractName address={original} network={network} />
    </ExternalLink>
  )
}
