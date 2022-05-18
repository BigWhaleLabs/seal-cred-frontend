import { Suspense } from 'react'
import EnsStore from 'stores/EnsStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useEnsNameOrAddress from 'hooks/useEnsNameOrAddress'

function EnsAddressSuspender({ address }: { address: string }) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return <span>{truncateMiddleIfNeeded(ensNameOrAddress, 17)}</span>
}

export default function ({ address }: { address: string }) {
  EnsStore.fetchEnsName(address)

  return (
    <Suspense fallback={<span>{truncateMiddleIfNeeded(address, 17)}</span>}>
      <EnsAddressSuspender address={address} />
    </Suspense>
  )
}
