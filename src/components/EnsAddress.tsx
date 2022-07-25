import { GoerliEnsStore } from 'stores/EnsStore'
import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import Network from 'models/Network'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'

interface EnsAddressProps {
  address: string
  network: Network
}

function EnsAddressSuspended({
  address,
  truncate,
  truncateSize,
}: EnsAddressProps & { truncate?: boolean; truncateSize: number }) {
  const { ensNames } = useSnapshot(GoerliEnsStore)
  const ensName = ensNames[address]
  if (!ensName) GoerliEnsStore.fetchEnsName(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensName || address, truncateSize)
        : ensName || truncateMiddleIfNeeded(address, truncateSize)}
    </>
  )
}

export default memo<EnsAddressProps>(({ address, network }) => {
  const { md, lg } = useBreakpoints()
  const truncateSize = md ? (lg ? 25 : 17) : 11

  return (
    <Suspense fallback={truncateMiddleIfNeeded(address, truncateSize)}>
      <EnsAddressSuspended
        address={address}
        truncateSize={truncateSize}
        truncate={!lg}
        network={network}
      />
    </Suspense>
  )
})
