import { BodyText, SubheaderText } from 'components/Text'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'

export default function SupportedContracts() {
  const { ledger } = useSnapshot(StreetCredStore)

  const addresses: string[] = []
  Object.values(ledger).forEach(async ({ originalContract }) =>
    addresses.push(await originalContract.name())
  )
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
