import { BodyText } from 'components/Text'
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
    <>
      {isFetching && <>Fetching </>}
      {truncatedText}
    </>
  ) : (
    <BodyText small>
      {isFetching && <>Fetching </>}
      {truncatedText}
    </BodyText>
  )
}

function ContractNameComponent({
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
        />
      ) : (
        <EnsAddress address={address} />
      )}
    </>
  )
}

export default function ({
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
        truncate={truncate}
        address={address}
        truncatedStyle={truncatedStyle}
      />
    </Suspense>
  )
}
