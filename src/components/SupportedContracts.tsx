import { BodyText, SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import StreetCredStore from 'stores/StreetCredStore'
import classnames, { display, flexDirection, space } from 'classnames/tailwind'

function SupportedContractName({ address }: { address: string }) {
  const { contractNames } = useSnapshot(StreetCredStore)
  return <BodyText>{contractNames[address] || address}</BodyText>
}

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-2')
)

function SupportedContractsComponent() {
  const { ledger } = useSnapshot(StreetCredStore)
  const contractAddresses = Object.keys(ledger)

  return contractAddresses.length ? (
    <div className={container}>
      {contractAddresses.map((address) => (
        <Suspense
          key={address}
          fallback={<SubheaderText>{address}...</SubheaderText>}
        >
          <SupportedContractName address={address} />
        </Suspense>
      ))}
    </div>
  ) : (
    <SubheaderText>No contracts supported yet</SubheaderText>
  )
}

export default function SupportedContracts() {
  return (
    <Suspense
      fallback={<SubheaderText>Fetching avaliable tokens...</SubheaderText>}
    >
      <SupportedContractsComponent />
    </Suspense>
  )
}
