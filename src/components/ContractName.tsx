import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import ContractNamesStore from 'stores/ContractNamesStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

const addressText = wordBreak('break-all')

interface ContractNameProps {
  address: string
  truncate?: boolean
}

function ContractNameSuspended({ address, truncate }: ContractNameProps) {
  const { contractNames } = useSnapshot(ContractNamesStore)
  const contractName = contractNames[address]
  if (!contractNames[address]) ContractNamesStore.fetchContractName(address)

  return (
    <span className={contractName ? undefined : addressText}>
      {truncate
        ? truncateMiddleIfNeeded(contractName || address, 17)
        : contractName || address}
    </span>
  )
}

export default memo<ContractNameProps>(({ address, truncate }) => (
  <Suspense
    fallback={
      <span className={addressText}>
        {truncate ? truncateMiddleIfNeeded(address, 17) : address}
      </span>
    }
  >
    <ContractNameSuspended address={address} truncate={truncate} />
  </Suspense>
))
