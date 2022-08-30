import { LinkText } from 'components/ui/Text'
import { Suspense } from 'react'
import { display, wordBreak } from 'classnames/tailwind'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import ENSAddress from 'components/ui/ENSAddress'
import Network from 'models/Network'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'
import useOwnerAddress from 'hooks/useOwnerAddress'

const container = wordBreak('break-all')

function OwnerAddress({
  owner,
  network,
  truncateSize,
}: {
  owner: string
  network: Network
  truncateSize: number
}) {
  return (
    <LinkText
      targetBlank
      url={getEtherscanAddressUrl(owner, network)}
      gradientFrom="from-secondary"
      gradientTo="to-accent"
      title={owner}
      bold
    >
      <ENSAddress
        address={owner}
        network={network}
        truncateSize={truncateSize}
      />
    </LinkText>
  )
}

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
        <>
          <span className={displayTo('md')}>
            <OwnerAddress owner={owner} network={network} truncateSize={11} />
          </span>
          <span className={display(displayFrom('md'), 'lg:hidden')}>
            <OwnerAddress owner={owner} network={network} truncateSize={17} />
          </span>
          <span className={displayFrom('lg')}>
            <OwnerAddress owner={owner} network={network} truncateSize={25} />
          </span>
        </>
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
