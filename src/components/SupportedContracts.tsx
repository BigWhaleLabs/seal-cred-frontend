import { BodyText, SubheaderText } from 'components/Text'
import { Suspense, lazy } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import StreetCredStore from 'stores/StreetCredStore'
const ContractName = lazy(() => import('components/ContractName'))

function SupportedContractsComponent() {
  const { ledger } = useSnapshot(StreetCredStore)
  const contractAddresses = Object.keys(ledger)

  return contractAddresses.length ? (
    <ContractListContainer>
      {contractAddresses.map((address) => (
        <BodyText size="base">
          <ContractName key={address} address={address} />
        </BodyText>
      ))}
    </ContractListContainer>
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
