import { Suspense } from 'react'
import EnsStore from 'stores/EnsStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useEnsNameOrAddress from 'hooks/useEnsNameOrAddress'

function EnsAddressSuspender({ address }: { address: string }) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return <>{truncateMiddleIfNeeded(ensNameOrAddress, 17)}</>
}

export default function ({ address }: { address: string }) {
  EnsStore.fetchEnsName(address)

  return (
    <Suspense fallback={<>{truncateMiddleIfNeeded(address, 17)}</>}>
      <EnsAddressSuspender address={address} />
    </Suspense>
  )
}
