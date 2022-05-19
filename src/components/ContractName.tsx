import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

interface ContractName {
  address: string
  truncate?: boolean
  overflow?: boolean
  isFetching?: boolean
}

function ContractNameSuspender({
  truncate,
  address,
  isFetching,
}: ContractName) {
  const { contractNames } = useSnapshot(SealCredStore)

  const truncatedContractAddress =
    truncate && address.length > 15
      ? truncateMiddleIfNeeded(address, 11)
      : address

  return (
    <>
      {contractNames[address] ? (
        <>
          {isFetching && <>Fetching </>}
          {truncatedContractAddress}
        </>
      ) : (
        <EnsAddress address={address} />
      )}
    </>
  )
}

export default function ({ truncate, address }: ContractName) {
  return (
    <Suspense fallback={<ContractNameSuspender isFetching address={address} />}>
      <ContractNameSuspender truncate={truncate} address={address} />
    </Suspense>
  )
}
