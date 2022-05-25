import { LinkText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

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
    <>
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
    </>
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
