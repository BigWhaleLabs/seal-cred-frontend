import { Suspense, memo } from 'react'
import { display } from 'classnames/tailwind'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import ENSStore from 'stores/ENSStore'
import Network from 'models/Network'

interface ENSAddressProps {
  address: string
  network: Network
}

function ENSAddressSuspended({
  address,
  network,
  truncate,
  truncateSize,
}: ENSAddressProps & { truncate?: boolean; truncateSize: number }) {
  const { eNSNames } = useSnapshot(ENSStore.networks[network])
  const ensName = eNSNames[address]

  if (!ensName) ENSStore.networks[network].fetchENSName(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensName || address, truncateSize)
        : ensName || truncateMiddleIfNeeded(address, truncateSize)}
    </>
  )
}

function ENSAddress({
  address,
  network,
  truncateSize,
}: ENSAddressProps & { truncateSize: number }) {
  return (
    <Suspense fallback={truncateMiddleIfNeeded(address, truncateSize)}>
      <ENSAddressSuspended
        truncate
        address={address}
        network={network}
        truncateSize={truncateSize}
      />
    </Suspense>
  )
}

export default memo<ENSAddressProps & { truncateSize?: number }>(
  ({ address, network, truncateSize }) => {
    // Used for gradient link. It won't work if we wrap it with a span
    if (truncateSize)
      return (
        <ENSAddress
          address={address}
          network={network}
          truncateSize={truncateSize}
        />
      )

    return (
      <>
        <span className={displayTo('md')}>
          <ENSAddress address={address} network={network} truncateSize={11} />
        </span>
        <span className={display(displayFrom('md'), 'lg:hidden')}>
          <ENSAddress address={address} network={network} truncateSize={17} />
        </span>
        <span className={displayFrom('lg')}>
          <ENSAddress address={address} network={network} truncateSize={25} />
        </span>
      </>
    )
  }
)
