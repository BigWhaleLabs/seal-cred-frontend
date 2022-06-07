import { LinkText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const container = wordBreak('break-all')
function OwnedBadgeAddressSuspender({
  derivativeAddress,
  tokenId,
}: {
  derivativeAddress: string
  tokenId: string
}) {
  const { derivativeContractsToOwnersMaps } = useSnapshot(SealCredStore)
  const owner =
    derivativeContractsToOwnersMaps[derivativeAddress][Number(tokenId)]

  return (
    <span className={container}>
      {owner && (
        <LinkText
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
      <OwnedBadgeAddressSuspender
        derivativeAddress={derivativeAddress}
        tokenId={tokenId}
      />
    </Suspense>
  )
}
