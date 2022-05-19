import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

interface ContractNameProps {
  address: string
}

function ContractNameSuspender({ address }: ContractNameProps) {
  const { contractNames } = useSnapshot(SealCredStore)
  const contractName = contractNames[address]
  return <>{truncateMiddleIfNeeded(contractName || address, 17)}</>
}

export default function ({ address }: ContractNameProps) {
  return (
    <Suspense fallback={<>truncateMiddleIfNeeded(address, 17)</>}>
      <ContractNameSuspender address={address} />
    </Suspense>
  )
}
