import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

interface ContractName {
  address: string
  isFetching?: boolean
}

function ContractNameSuspender({ address, isFetching }: ContractName) {
  const { contractNames } = useSnapshot(SealCredStore)

  const contractName = contractNames[address]

  return (
    <>
      {isFetching ? (
        `Fetching ${truncateMiddleIfNeeded(address, 11)}`
      ) : contractName ? (
        truncateMiddleIfNeeded(contractName, 17)
      ) : (
        <EnsAddress address={address} />
      )}
    </>
  )
}

export default function ({ address }: ContractName) {
  return (
    <Suspense fallback={<ContractNameSuspender isFetching address={address} />}>
      <ContractNameSuspender address={address} />
    </Suspense>
  )
}
