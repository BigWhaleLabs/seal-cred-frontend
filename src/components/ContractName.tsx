import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import truncateMiddle from 'helpers/truncateMiddle'

interface ContractNameProps {
  address: string
  otherStyle?: boolean
}

interface FetchingContract extends ContractNameProps {
  isFetching?: boolean
}

function TextBlock({ address, otherStyle, isFetching }: FetchingContract) {
  return otherStyle ? (
    <>
      {isFetching && <>Fetching </>}
      {address}
    </>
  ) : (
    <BodyText size="sm">
      {isFetching && <>Fetching </>}
      {address}
    </BodyText>
  )
}

function ContractNameComponent({ address, otherStyle }: ContractNameProps) {
  const { contractNames } = useSnapshot(SealCredStore)

  const nameOrAddress = contractNames[address]
    ? contractNames[address]
    : truncateMiddle(address, 4, -4)

  return <TextBlock address={nameOrAddress || ''} otherStyle={otherStyle} />
}

export default function ContractName({
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
      <ContractNameComponent address={address} otherStyle={otherStyle} />
    </Suspense>
  )
}
