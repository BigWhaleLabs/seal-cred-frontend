import { Suspense } from 'preact/compat'
import EnsStore from 'stores/EnsStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useEnsNameOrAddress from 'hooks/useEnsNameOrAddress'

interface EnsAddressProps {
  address: string
  truncate?: boolean
}

function EnsAddressSuspender({ address, truncate }: EnsAddressProps) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensNameOrAddress, 17)
        : ensNameOrAddress}
    </>
  )
}

export default function ({ address, truncate }: EnsAddressProps) {
  EnsStore.fetchEnsName(address)

  return (
    <Suspense
      fallback={<>{truncate ? truncateMiddleIfNeeded(address, 17) : address}</>}
    >
      <EnsAddressSuspender address={address} truncate={truncate} />
    </Suspense>
  )
}
