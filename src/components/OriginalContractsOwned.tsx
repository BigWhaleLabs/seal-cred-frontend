import { BodyText, SubheaderText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import StreetCredStore from 'stores/StreetCredStore'

function ContractList() {
  const { originalContracts } = useSnapshot(StreetCredStore)
  return (
    <>
      {originalContracts?.owned?.length ? (
        <ContractListContainer>
          {originalContracts.owned.map((contract) => (
            <BodyText size="base">
              <ContractName key={contract.address} address={contract.address} />
            </BodyText>
          ))}
        </ContractListContainer>
      ) : (
        <SubheaderText>You don't have any supported tokens yet.</SubheaderText>
      )}
    </>
  )
}

export default function OriginalContractsOwned() {
  return (
    <Suspense
      fallback={
        <BodyText size="base">
          Fetching available tokens owned by you...
        </BodyText>
      }
    >
      <ContractList />
    </Suspense>
  )
}
