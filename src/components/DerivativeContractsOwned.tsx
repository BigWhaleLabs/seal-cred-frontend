import { BodyText, SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import StreetCredStore from 'stores/StreetCredStore'

function ContractList() {
  const { derivativeContracts } = useSnapshot(StreetCredStore)
  return (
    <>
      {derivativeContracts?.owned?.length ? (
        <ContractListContainer>
          {derivativeContracts.owned.map((contract) => (
            <BodyText size="base">
              <ContractName key={contract.address} address={contract.address} />
            </BodyText>
          ))}
        </ContractListContainer>
      ) : (
        <SubheaderText>You don't have any derivative tokens yet.</SubheaderText>
      )}
    </>
  )
}

export default function DerivativeContractsOwned() {
  return (
    <Suspense
      fallback={
        <BodyText size="base">
          Fetching derivative tokens owned by you...
        </BodyText>
      }
    >
      <ContractList />
    </Suspense>
  )
}
