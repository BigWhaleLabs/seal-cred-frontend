import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
import shortenedAddress from 'helpers/shortenedAddress'

export default function ContractName({ address }: { address: string }) {
  const { contractNames } = useSnapshot(StreetCredStore)
  return (
    <BodyText>
      {contractNames[address]
        ? `${contractNames[address]} (${shortenedAddress(address)})`
        : address}
    </BodyText>
  )
}
