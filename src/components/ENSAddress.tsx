import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import ENSStore from 'stores/ENSStore'
import Network from 'models/Network'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'

interface ENSAddressProps {
  address: string
  network: Network
}

function ENSAddressSuspended({
  address,
  truncate,
  truncateSize,
  network,
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
