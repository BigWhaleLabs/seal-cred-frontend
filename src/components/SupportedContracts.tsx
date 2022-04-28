import { BodyText, SubheaderText } from 'components/Text'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'

export default function SupportedContracts() {
  const { ledger } = useSnapshot(StreetCredStore)
  const [supportedContracts, setSupportedContracts] =
    useState<{ name: string; address: string }[]>()

  useEffect(() => {
    async function fetchSupportedContracts() {
      const objects: Promise<{ name: string; address: string }>[] =
        Object.values(ledger).map(async ({ originalContract }) => {
          const contractName = await originalContract.name()
          const name =
            !contractName || !contractName.length
              ? `Contract: ${originalContract.address}`
              : contractName

          return {
            name,
            address: originalContract.address,
          }
        })
      setSupportedContracts(await Promise.all(objects))
    }

    void fetchSupportedContracts()
  }, [ledger])

  return supportedContracts && supportedContracts.length ? (
    <>
      {supportedContracts.map((contract) => (
        <BodyText key={contract.address}>{contract.name}</BodyText>
      ))}
    </>
  ) : (
    <SubheaderText>No contracts supported yet</SubheaderText>
  )
}
