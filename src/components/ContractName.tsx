import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

interface ContractNameProps {
  address: string
}

function ContractNameSuspender({ address }: ContractNameProps) {
  const { contractNames } = useSnapshot(SealCredStore)

  const contractName = contractNames[address]

  return (
    <>
      {contractName ? (
        truncateMiddleIfNeeded(contractName, 17)
      ) : (
        <EnsAddress address={address} />
      )}
    </>
  )
}

export default function ({ address }: ContractNameProps) {
  return (
    <Suspense fallback={truncateMiddleIfNeeded(address, 11)}>
      <ContractNameSuspender address={address} />
    </Suspense>
  )
}
