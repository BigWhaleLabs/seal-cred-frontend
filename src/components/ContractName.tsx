import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
import shortenedAddress from 'helpers/shortenedAddress'

export default function ContractName({
  address,
  account,
}: {
  address: string
  account?: string
}) {
  const { contractNames } = useSnapshot(StreetCredStore)
  return (
    <BodyText>
      {contractNames[address]
        ? `${contractNames[address]} (${shortenedAddress(address)})`
        : address}
      {!!account && ` for ${shortenedAddress(account)}`}
    </BodyText>
  )
}
