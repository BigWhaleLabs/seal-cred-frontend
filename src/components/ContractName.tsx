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
  truncatedStyle?: boolean
}

interface FetchingContract extends ContractNameProps {
  isFetching?: boolean
}

function TextBlock({
  overflow,
  truncate,
  address,
  truncatedStyle,
  isFetching,
}: FetchingContract) {
  const truncatedText =
    truncate && address.length > 15
      ? truncateMiddleIfNeeded(address, 11)
      : address

  return truncatedStyle ? (
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
  truncatedStyle,
}: ContractNameProps) {
  const { contractNames } = useSnapshot(SealCredStore)

  return (
    <>
      {contractNames[address] ? (
        <TextBlock
          address={contractNames[address] || ''}
          truncatedStyle={truncatedStyle}
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
  truncatedStyle,
}: ContractNameProps) {
  const shortAddress = truncateMiddleIfNeeded(address, 14)
  return (
    <Suspense
      fallback={
        <TextBlock
          isFetching
          address={shortAddress}
          truncatedStyle={truncatedStyle}
        />
      }
    >
      <ContractNameComponent
        overflow={overflow}
        truncate={truncate}
        address={address}
        truncatedStyle={truncatedStyle}
      />
    </Suspense>
  )
}
