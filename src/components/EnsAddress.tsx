import { FC } from 'react'
import { Suspense } from 'react'
import EnsStore from 'stores/EnsStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useEnsNameOrAddress from 'helpers/useEnsNameOrAddress'

function EnsAddressSuspender({ address }: { address: string }) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return <span>{truncateMiddleIfNeeded(ensNameOrAddress, 17)}</span>
}

const EnsAddress: FC<{ address: string }> = ({ address }) => {
  EnsStore.fetchEnsName(address)

  return (
    <Suspense fallback={<span>{address}</span>}>
      <EnsAddressSuspender address={address} />
    </Suspense>
  )
}

export default EnsAddress
