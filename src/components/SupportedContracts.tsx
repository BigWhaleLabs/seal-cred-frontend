import { SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import StreetCredStore from 'stores/StreetCredStore'

function SupportedContractsComponent() {
  const { ledger } = useSnapshot(StreetCredStore)
  const contractAddresses = Object.keys(ledger)

  return contractAddresses.length ? (
    <ContractListContainer>
      {contractAddresses.map((address) => (
        <Suspense
          key={address}
          fallback={<SubheaderText>{address}...</SubheaderText>}
        >
          <ContractName address={address} />
        </Suspense>
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
