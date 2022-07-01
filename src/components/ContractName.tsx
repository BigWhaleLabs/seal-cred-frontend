import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import { wordBreak } from 'classnames/tailwind'
import ContractNamesStore from 'stores/ContractNamesStore'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

const addressText = wordBreak('break-all')

interface ContractNameProps {
  address: string
  truncate?: boolean
  clearType?: boolean
}

function ContractNameSuspended({
  address,
  truncate,
  clearType,
}: ContractNameProps) {
  const { emailDerivativeContracts = [], ERC721derivativeContracts = [] } =
    useSnapshot(SealCredStore)
  const { contractNames } = useSnapshot(ContractNamesStore)
  let contractName = contractNames[address]
  if (!contractName) ContractNamesStore.fetchContractName(address)

  if (clearType) {
    if (contractName && emailDerivativeContracts.includes(address))
      contractName = contractName.replace(' email', '')

    if (contractName && ERC721derivativeContracts.includes(address))
      contractName = contractName.replace(' (derivative)', '')
  }

  return (
    <span className={contractName ? undefined : addressText}>
      {truncate
        ? truncateMiddleIfNeeded(contractName || address, 17)
        : contractName || address}
    </span>
  )
}

export default memo<ContractNameProps>(({ address, truncate, clearType }) => (
  <Suspense
    fallback={
      <span className={addressText}>
        {truncate ? truncateMiddleIfNeeded(address, 17) : address}
      </span>
    }
  >
    <ContractNameSuspended
      address={address}
      truncate={truncate}
      clearType={clearType}
    />
  </Suspense>
))
