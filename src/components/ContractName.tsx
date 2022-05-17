import { BodyText, textTruncateStyles } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

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
    truncate && address.length > 15
      ? truncateMiddleIfNeeded(address, 11)
      : address

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
  overflow,
  truncate,
  address,
  otherStyle,
}: ContractNameProps) {
  const { contractNames } = useSnapshot(SealCredStore)

  return (
    <>
      {contractNames[address] ? (
        <TextBlock
          address={contractNames[address] || ''}
          otherStyle={otherStyle}
          truncate={truncate}
          overflow={overflow}
        />
      ) : (
        <EnsAddress address={address} />
      )}
    </>
  )
}

export default function ({
  overflow,
  truncate,
  address,
  otherStyle,
}: ContractNameProps) {
  const shortAddress = truncateMiddleIfNeeded(address, 14)
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
