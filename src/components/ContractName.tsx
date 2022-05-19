import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

interface ContractName {
  address: string
}

function ContractNameSuspender({ address }: ContractName) {
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

export default function ({ address }: ContractName) {
  return (
    <Suspense fallback={truncateMiddleIfNeeded(address, 11)}>
      <ContractNameSuspender address={address} />
    </Suspense>
  )
}
