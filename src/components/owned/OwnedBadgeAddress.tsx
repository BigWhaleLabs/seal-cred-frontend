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
  network,
  owner,
  truncateSize,
}: {
  owner: string
  network: Network
  truncateSize: number
}) {
  return (
    <LinkText
      bold
      targetBlank
      gradientFrom="from-secondary"
      gradientTo="to-accent"
      title={owner}
      url={getEtherscanAddressUrl(owner, network)}
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
  network,
  tokenId,
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
            <OwnerAddress network={network} owner={owner} truncateSize={11} />
          </span>
          <span className={display(displayFrom('md'), 'lg:hidden')}>
            <OwnerAddress network={network} owner={owner} truncateSize={17} />
          </span>
          <span className={displayFrom('lg')}>
            <OwnerAddress network={network} owner={owner} truncateSize={25} />
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
  network,
  tokenId,
}: OwnedBadgeAddressProps) {
  return (
    <Suspense fallback={<>Fetching owner address...</>}>
      <OwnedBadgeAddressSuspended
        derivativeAddress={derivativeAddress}
        network={network}
        tokenId={tokenId}
      />
    </Suspense>
  )
}
