import { BodyText, SubheaderText } from 'components/Text'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'

export default function SupportedContracts() {
  const { ledger } = useSnapshot(StreetCredStore)
  const [supportedContracts, setSupportedContracts] = useState<string[]>()

  useEffect(() => {
    async function fetchSupportedContracts() {
      const addresses: Promise<string>[] = await Object.values(ledger).map(
        async ({ originalContract }) => {
          const name = await originalContract.name()
          return name
        }
      )
      setSupportedContracts(await Promise.all(addresses))
    }

    void fetchSupportedContracts()
  }, [ledger])

  return supportedContracts && supportedContracts.length ? (
    <>
      {supportedContracts.map((address) => (
        <BodyText key={address}>{address}</BodyText>
      ))}
    </>
  ) : (
    <SubheaderText>No contracts supported yet</SubheaderText>
  )
}
