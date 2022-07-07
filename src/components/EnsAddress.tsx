import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import EnsStore from 'stores/EnsStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'

interface EnsAddressProps {
  address: string
}

function EnsAddressSuspended({
  address,
  truncate,
}: EnsAddressProps & { truncate?: boolean }) {
  const { ensNames } = useSnapshot(EnsStore)
  const ensName = ensNames[address]
  if (!ensName) EnsStore.fetchEnsName(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensName || address, 17)
        : ensName || truncateMiddleIfNeeded(address, 25)}
    </>
  )
}

export default memo<EnsAddressProps>(({ address }) => {
  const { lg } = useBreakpoints()
  return (
    <Suspense
      fallback={<>{!lg ? truncateMiddleIfNeeded(address, 17) : address}</>}
    >
      <EnsAddressSuspended address={address} truncate={!lg} />
    </Suspense>
  )
})
