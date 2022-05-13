import { FC } from 'react'
import { Suspense } from 'react'
import ENSStore from 'stores/ENSStore'
import truncateMiddle from 'helpers/truncateMiddle'
import useENSName from 'helpers/useENSName'

function ENSAddressSuspender({ address }: { address: string }) {
  const ensName = useENSName(address)

  const nameOrAddress = !ensName
    ? truncateMiddle(address, 11, -4)
    : ensName.length > 16
    ? truncateMiddle(ensName, 11, -3)
    : ensName

  return <span>{nameOrAddress}</span>
}

const ENSAddress: FC<{ address: string }> = ({ address }) => {
  ENSStore.fetchtEnsName(address)

  return (
    <Suspense fallback={<>Looking for ens...</>}>
      <ENSAddressSuspender address={address} />
    </Suspense>
  )
}

export default ENSAddress
