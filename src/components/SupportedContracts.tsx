import { SubheaderText } from 'components/Text'
import { Suspense, lazy } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import SealCredStore from 'stores/SealCredStore'

const ContractName = lazy(() => import('components/ContractName'))

function SupportedContractsComponent() {
  const { ledger } = useSnapshot(SealCredStore)
  const contractAddresses = Object.keys(ledger)

  return contractAddresses.length ? (
    <ContractListContainer>
      {contractAddresses.map((address) => (
        <ContractName key={address} address={address} />
      ))}
    </ContractListContainer>
  ) : (
    <SubheaderText>No contracts supported yet</SubheaderText>
  )
}

export default function () {
  return (
    <Suspense
      fallback={<SubheaderText>Fetching avaliable tokens...</SubheaderText>}
    >
      <SupportedContractsComponent />
    </Suspense>
  )
}
