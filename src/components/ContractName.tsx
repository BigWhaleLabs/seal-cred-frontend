import { BodyText, textTruncateStyles } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddle from 'helpers/truncateMiddle'
interface ContractNameProps {
  truncate?: boolean
  overflow?: boolean
  address: string
  otherStyle?: boolean
}

interface FetchingContract extends ContractNameProps {
  isFetching?: boolean
}

function TextBlock({
  overflow,
  truncate,
  address,
  otherStyle,
  isFetching,
}: FetchingContract) {
  const truncatedText =
    truncate && address.length > 15 ? truncateMiddle(address, 14) : address

  return otherStyle ? (
    <div className={overflow ? textTruncateStyles : undefined}>
      {isFetching && <>Fetching </>}
      {truncatedText}
    </div>
  ) : (
    <BodyText size="sm" overflow={overflow}>
      {isFetching && <>Fetching </>}
      {truncatedText}
    </BodyText>
  )
}

function ContractNameComponent({
  overflow,
  truncate,
  address,
  otherStyle,
}: ContractNameProps) {
  const { contractNames } = useSnapshot(SealCredStore)

  const nameOrAddress = contractNames[address]
    ? contractNames[address]
    : truncateMiddle(address, 4, -4)

  return (
    <TextBlock
      address={nameOrAddress || ''}
      otherStyle={otherStyle}
      truncate={truncate}
      overflow={overflow}
    />
  )
}

export default function ContractName({
  overflow,
  truncate,
  address,
  otherStyle,
}: ContractNameProps) {
  const shortAddress = truncateMiddle(address, 4, -4)
  return (
    <Suspense
      fallback={
        <TextBlock isFetching address={shortAddress} otherStyle={otherStyle} />
      }
    >
      <ContractNameComponent
        overflow={overflow}
        truncate={truncate}
        address={address}
        otherStyle={otherStyle}
      />
    </Suspense>
  )
}
