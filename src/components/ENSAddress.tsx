import { FC } from 'react'
import { Suspense } from 'react'
import { truncateIfNeeded } from 'helpers/truncateMiddle'
import EnsStore from 'stores/EnsStore'
import useEnsNameOrAddress from 'helpers/useEnsNameOrAddress'

function EnsAddressSuspender({ address }: { address: string }) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return <span>{truncateIfNeeded(ensNameOrAddress, 17)}</span>
}

const EnsAddress: FC<{ address: string }> = ({ address }) => {
  EnsStore.fetchEnsName(address)

  return (
    <Suspense fallback={<>Looking for ens...</>}>
      <EnsAddressSuspender address={address} />
    </Suspense>
  )
}

export default EnsAddress
