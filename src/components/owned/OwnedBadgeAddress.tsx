import { LinkText } from 'components/Text'
import { Suspense } from 'react'
import { wordBreak } from 'classnames/tailwind'
import EnsAddress from 'components/EnsAddress'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import useOwnerAddress from 'hooks/useOwnerAddress'

const container = wordBreak('break-all')
function OwnedBadgeAddressSuspended({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const owner = useOwnerAddress(derivativeAddress, tokenId)

  return (
    <span className={container}>
      {owner && (
        <LinkText
          blank
          url={getEtherscanAddressUrl(owner)}
          gradientFrom="from-secondary"
          gradientTo="to-accent"
          title={owner}
          bold
        >
          <EnsAddress address={owner} />
        </LinkText>
      )}
    </span>
  )
}

interface OwnedBadgeAddressProps {
  derivativeAddress: string
  tokenId: string
}

export default function ({
  derivativeAddress,
  tokenId,
}: OwnedBadgeAddressProps) {
  return (
    <Suspense fallback={<>Fetching owner address...</>}>
      <OwnedBadgeAddressSuspended
        derivativeAddress={derivativeAddress}
        tokenId={tokenId}
      />
    </Suspense>
  )
}
