import { Suspense, memo } from 'react'
import Network from 'models/Network'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  display,
  flexWrap,
  minWidth,
  wordBreak,
} from 'classnames/tailwind'
import getContractName from 'helpers/network/getContractName'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'

const addressText = wordBreak('break-all')
const badgeNameWrapper = classnames(
  minWidth('min-w-fit'),
  display('inline-flex'),
  flexWrap('flex-wrap')
)

interface ContractNameProps {
  address: string
  truncate?: boolean
  clearType?: boolean
  hyphens?: boolean
  network: Network
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
  network,
}: ContractNameProps) {
  let contractName = getContractName(address, network, truncate)

  if (clearType)
    contractName = contractName.replace(/ (email|\(derivative\))$/, '')

  return (
    <span
      className={classNamesToString(
        contractName ? undefined : addressText,
        hyphens ? 'hyphensAuto' : undefined
      )}
    >
      {hyphens ? wrappedWord(contractName) : contractName}
    </span>
  )
}

export default memo<ContractNameProps>(({ address, truncate, ...rest }) => (
  <Suspense
    fallback={
      <span className={addressText}>
        {truncate ? truncateMiddleIfNeeded(address, 17) : address}
      </span>
    }
  >
    <ContractNameSuspended address={address} truncate={truncate} {...rest} />
  </Suspense>
))
