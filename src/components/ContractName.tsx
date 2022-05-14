import { BodyText, textTruncateStyles } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import getOriginalByDerivative from 'helpers/getOriginalByDerivative'
import truncateMiddle from 'helpers/truncateMiddle'
interface ContractNameProps {
  fromOriginal?: boolean
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
    overflow ? (
      <div className={textTruncateStyles}>
        {isFetching && <>Fetching </>}
        {truncatedText}
      </div>
    ) : (
      <>
        {isFetching && <>Fetching </>}
        {truncatedText}
      </>
    )
  ) : (
    <BodyText size="sm" overflow={overflow}>
      {isFetching && <>Fetching </>}
      {truncatedText}
    </BodyText>
  )
}

function ContractNameComponent({
  fromOriginal,
  overflow,
  truncate,
  address,
  otherStyle,
}: ContractNameProps) {
  const { contractNames } = useSnapshot(SealCredStore)
  let originalAddress

  if (fromOriginal) {
    originalAddress = getOriginalByDerivative(address)
  }

  const nameOrAddress =
    fromOriginal && originalAddress
      ? contractNames[originalAddress]
      : contractNames[address]
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
  fromOriginal,
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
        fromOriginal={fromOriginal}
        overflow={overflow}
        truncate={truncate}
        address={address}
        otherStyle={otherStyle}
      />
    </Suspense>
  )
}
