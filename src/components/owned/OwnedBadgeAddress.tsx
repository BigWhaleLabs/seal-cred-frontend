import { LinkText } from 'components/Text'
import { Suspense } from 'react'
import { wordBreak } from 'classnames/tailwind'
import EnsAddress from 'components/EnsAddress'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import useOwnerAddress from 'hooks/useOwnerAddress'

const container = wordBreak('break-all')
function OwnedBadgeAddressSuspended({
  derivativeAddress,
  tokenId,
  network,
}: {
  derivativeAddress: string
  tokenId: string
  network: Network
}) {
  const owner = useOwnerAddress(derivativeAddress, tokenId, network)

  return (
    <span className={container}>
      {owner && (
        <LinkText
          targetBlank
          url={getEtherscanAddressUrl(owner, network)}
          gradientFrom="from-secondary"
          gradientTo="to-accent"
          title={owner}
          bold
        >
          <EnsAddress address={owner} network={network} />
        </LinkText>
      )}
    </span>
  )
}

interface OwnedBadgeAddressProps {
  derivativeAddress: string
  tokenId: string
  network: Network
}

export default function ({
  derivativeAddress,
  tokenId,
  network,
}: OwnedBadgeAddressProps) {
  return (
    <Suspense fallback={<>Fetching owner address...</>}>
      <OwnedBadgeAddressSuspended
        derivativeAddress={derivativeAddress}
        tokenId={tokenId}
        network={network}
      />
    </Suspense>
  )
}
