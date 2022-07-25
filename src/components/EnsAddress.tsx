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
}: EnsAddressProps & { truncate?: boolean }) {
  const { ensNames } = useSnapshot(GoerliEnsStore)
  const ensName = ensNames[address]
  if (!ensName) GoerliEnsStore.fetchEnsName(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensName || address, 17)
        : ensName || truncateMiddleIfNeeded(address, 25)}
    </>
  )
}

export default memo<EnsAddressProps>(({ address, network }) => {
  const { lg } = useBreakpoints()
  return (
    <Suspense
      fallback={
        <>
          {!lg
            ? truncateMiddleIfNeeded(address, 17)
            : truncateMiddleIfNeeded(address, 25)}
        </>
      }
    >
      <EnsAddressSuspended address={address} truncate={!lg} network={network} />
    </Suspense>
  )
})
