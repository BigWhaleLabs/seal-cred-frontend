import { Suspense, memo } from 'react'
import { useSnapshot } from 'valtio'
import { utils } from 'ethers'
import ContractNamesStore from 'stores/ContractNamesStore'
import Network from 'models/Network'
import SealCredStore from 'stores/SealCredStore'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  display,
  flexWrap,
  minWidth,
  wordBreak,
} from 'classnames/tailwind'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

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
  const { emailDerivativeContracts = [], ERC721derivativeContracts = [] } =
    useSnapshot(SealCredStore)
  const { contractNames } = useSnapshot(ContractNamesStore)
  let contractName = contractNames[address]
  if (!contractName) ContractNamesStore.fetchContractName(address, network)

  if (clearType) {
    if (contractName && emailDerivativeContracts.includes(address))
      contractName = contractName.replace(' email', '')

    if (contractName && ERC721derivativeContracts.includes(address))
      contractName = contractName.replace(' (derivative)', '')
  }

  let content = contractName || address

  if (truncate) content = truncateMiddleIfNeeded(content, 17)
  if (utils.isAddress(content)) content = truncateMiddleIfNeeded(content, 17)

  // Removes NULL symbols caused by Solidity -> JS string conversion
  content = content.replaceAll('\u0000', '')

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
