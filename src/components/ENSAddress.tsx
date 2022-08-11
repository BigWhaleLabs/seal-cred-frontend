import { GoerliENSStore } from 'stores/ENSStore'
import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'

interface ENSAddressProps {
  address: string
  network: Network
}

function ENSAddressSuspended({
  address,
  truncate,
  truncateSize,
}: ENSAddressProps & { truncate?: boolean; truncateSize: number }) {
  const { ENSNames } = useSnapshot(GoerliENSStore)
  const ensName = ENSNames[address]
  if (!ensName) GoerliENSStore.fetchENSName(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensName || address, truncateSize)
        : ensName || truncateMiddleIfNeeded(address, truncateSize)}
    </>
  )
}

export default memo<ENSAddressProps>(({ address, network }) => {
  const { md, lg } = useBreakpoints()
  const truncateSize = md ? (lg ? 25 : 17) : 11

  return (
    <Suspense fallback={truncateMiddleIfNeeded(address, truncateSize)}>
      <ENSAddressSuspended
        address={address}
        truncateSize={truncateSize}
        truncate={!lg}
        network={network}
      />
    </Suspense>
  )
})
