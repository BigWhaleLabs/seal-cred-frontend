import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

const addressText = wordBreak('break-all')

interface ContractNameProps {
  address: string
  truncate?: boolean
}

function ContractNameSuspender({ address, truncate }: ContractNameProps) {
  const { contractNames } = useSnapshot(SealCredStore)
  const contractName = contractNames[address]
  return (
    <span className={contractName ? undefined : addressText}>
      {truncate
        ? truncateMiddleIfNeeded(contractName || address, 17)
        : contractName || address}
    </span>
  )
}

export default function ({ address, truncate }: ContractNameProps) {
  return (
    <Suspense
      fallback={
        <span className={addressText}>
          {truncate ? truncateMiddleIfNeeded(address, 17) : address}
        </span>
      }
    >
      <ContractNameSuspender address={address} truncate={truncate} />
    </Suspense>
  )
}
