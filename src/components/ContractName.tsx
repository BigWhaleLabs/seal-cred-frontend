import { GoerliContractNamesStore } from 'stores/ContractNamesStore'
import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import { utils } from 'ethers'
import SealCredStore from 'stores/SealCredStore'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  display,
  flexWrap,
  minWidth,
  padding,
  wordBreak,
} from 'classnames/tailwind'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

const addressText = wordBreak('break-all')
const badgeNameWrapper = classnames(
  minWidth('min-w-fit'),
  display('inline-flex'),
  flexWrap('flex-wrap'),
  padding('pr-2')
)

interface ContractNameProps {
  address: string
  truncate?: boolean
  clearType?: boolean
  hyphens?: boolean
}

const wrappedWord = (name: string) => {
  return name
    .split(' ')
    .map((word) => <span className={badgeNameWrapper}>{word}</span>)
}

function ContractNameSuspended({
  address,
  hyphens,
  truncate,
  clearType,
}: ContractNameProps) {
  const { emailDerivativeContracts = [], ERC721derivativeContracts = [] } =
    useSnapshot(SealCredStore)
  const { contractNames } = useSnapshot(GoerliContractNamesStore)
  let contractName = contractNames[address]
  if (!contractName) GoerliContractNamesStore.fetchContractName(address)

  if (clearType) {
    if (contractName && emailDerivativeContracts.includes(address))
      contractName = contractName.replace(' email', '')

    if (contractName && ERC721derivativeContracts.includes(address))
      contractName = contractName.replace(' (derivative)', '')
  }

  let content = contractName || address

  if (truncate) content = truncateMiddleIfNeeded(content, 17)
  if (utils.isAddress(content)) content = truncateMiddleIfNeeded(content, 17)

  return (
    <span
      className={classNamesToString(
        contractName ? undefined : addressText,
        hyphens ? 'hyphensAuto' : undefined
      )}
    >
      {hyphens ? wrappedWord(content) : content}
    </span>
  )
}

export default memo<ContractNameProps>(
  ({ address, hyphens, truncate, clearType }) => (
    <Suspense
      fallback={
        <span className={addressText}>
          {truncate ? truncateMiddleIfNeeded(address, 17) : address}
        </span>
      }
    >
      <ContractNameSuspended
        address={address}
        hyphens={hyphens}
        truncate={truncate}
        clearType={clearType}
      />
    </Suspense>
  )
)
