import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
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
    <BodyText size="base">
      {isFetching && <>Fetching </>}
      {address}
    </BodyText>
  )
}

function ContractNameComponent({ address, otherStyle }: ContractNameProps) {
  const { contractNames } = useSnapshot(StreetCredStore)

  const nameOrAddress = contractNames[address]
    ? contractNames[address]
    : truncateMiddle(address, 5, -5)

  return <TextBlock address={nameOrAddress || ''} otherStyle={otherStyle} />
}

export default function ContractName({
  address,
  otherStyle,
}: ContractNameProps) {
  const shortAddress = truncateMiddle(address, 5, -5)
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
