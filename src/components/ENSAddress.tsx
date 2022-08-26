import { GoerliENSStore } from 'stores/ENSStore'
import { Suspense, memo } from 'react'
import { display } from 'classnames/tailwind'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

interface ENSAddressProps {
  address: string
  network: Network
}

function ENSAddressSuspended({
  address,
  truncate,
  truncateSize,
}: ENSAddressProps & { truncate?: boolean; truncateSize: number }) {
  const { eNSNames } = useSnapshot(GoerliENSStore)
  const ensName = eNSNames[address]
  if (!ensName) GoerliENSStore.fetchENSName(address)

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

export default memo<ENSAddressProps>(({ address, network }) => {
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
})
