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
  const truncatedContractName = contractName
    ? contractName.length > 15
      ? truncateMiddleIfNeeded(contractName, 11)
      : contractName
    : truncateMiddleIfNeeded(address, 11)

  return (
    <>
      {contractName ? (
        <>
          {isFetching && <>Fetching </>}
          {truncatedContractName}
        </>
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
