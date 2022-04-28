import { BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'

export default function ContractName({ address }: { address: string }) {
  const { contractNames } = useSnapshot(StreetCredStore)
  return <BodyText>{contractNames[address] || address}</BodyText>
}
