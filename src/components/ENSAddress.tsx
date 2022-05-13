import { FC } from 'react'
import { Suspense } from 'react'
import { truncateIfNeeded } from 'helpers/truncateMiddle'
import EnsStore from 'stores/EnsStore'
import useEnsNameOrAddress from 'helpers/useEnsNameOrAddress'

function ENSAddressSuspender({ address }: { address: string }) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return <span>{truncateIfNeeded(ensNameOrAddress, 17)}</span>
}

const ENSAddress: FC<{ address: string }> = ({ address }) => {
  EnsStore.fetchEnsName(address)

  return (
    <Suspense fallback={<>Looking for ens...</>}>
      <ENSAddressSuspender address={address} />
    </Suspense>
  )
}

export default ENSAddress
