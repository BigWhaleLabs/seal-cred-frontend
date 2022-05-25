import { Suspense } from 'react'
import EnsStore from 'stores/EnsStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useBreakpoints from 'hooks/useBreakpoints'
import useEnsNameOrAddress from 'hooks/useEnsNameOrAddress'

interface EnsAddressProps {
  address: string
}

function EnsAddressSuspender({
  address,
  truncate,
}: EnsAddressProps & { truncate?: boolean }) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensNameOrAddress, 17)
        : ensNameOrAddress}
    </>
  )
}

export default function ({ address }: EnsAddressProps) {
  const { lg } = useBreakpoints()
  EnsStore.fetchEnsName(address)

  return (
    <Suspense
      fallback={<>{!lg ? truncateMiddleIfNeeded(address, 17) : address}</>}
    >
      <EnsAddressSuspender address={address} truncate={!lg} />
    </Suspense>
  )
}
