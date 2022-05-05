import { BodyText, SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
import shortenedAddress from 'helpers/shortenedAddress'

interface ContractNameProps {
  address: string
  otherStyle?: boolean
}

function ContractNameComponent({ address, otherStyle }: ContractNameProps) {
  const { contractNames } = useSnapshot(StreetCredStore)

  const nameOrAddress = contractNames[address]
    ? contractNames[address]
    : `Contract: ${shortenedAddress(address)}`

  return otherStyle ? (
    <>{nameOrAddress}</>
  ) : (
    <BodyText size="base">{nameOrAddress}</BodyText>
  )
}

export default function ContractName({
  address,
  otherStyle,
}: ContractNameProps) {
  const shortAddress = `${address.slice(0, 5)}...${address.slice(
    -5,
    address.length
  )}`
  return (
    <Suspense fallback={<SubheaderText>{shortAddress}...</SubheaderText>}>
      <ContractNameComponent address={address} otherStyle={otherStyle} />
    </Suspense>
  )
}
