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
  otherStyle?: boolean
}

interface FetchingContract extends ContractNameProps {
  isFetching?: boolean
}

function TextBlock({
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
        />
      ) : (
        <EnsAddress address={address} />
      )}
    </>
  )
}

export default function ({ truncate, address, otherStyle }: ContractNameProps) {
  const shortAddress = truncateMiddleIfNeeded(address, 14)
  return (
    <Suspense
      fallback={
        <TextBlock isFetching address={shortAddress} otherStyle={otherStyle} />
      }
    >
      <ContractNameComponent
        truncate={truncate}
        address={address}
        otherStyle={otherStyle}
      />
    </Suspense>
  )
}
