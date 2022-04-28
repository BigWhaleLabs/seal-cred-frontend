import { BodyText, SubheaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'

// TODO: display names instead of addresses

export default function SupportedContracts() {
  const { ledger } = useSnapshot(StreetCredStore)
  const addresses = Object.keys(ledger)
  return addresses.length ? (
    <>
      {addresses.map((address) => (
        <BodyText key={address}>{address}</BodyText>
      ))}
    </>
  ) : (
    <SubheaderText>No contracts supported yet</SubheaderText>
  )
}
