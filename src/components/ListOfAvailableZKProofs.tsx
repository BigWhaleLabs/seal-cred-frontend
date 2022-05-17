import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import ContractListContainer from 'components/ContractListContainer'
import ZKProof from 'components/ZkProof'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

function ContractList() {
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()

  return (
    <>
      {!!proofAddressesAvailableToCreate.length && (
        <ContractListContainer>
          {proofAddressesAvailableToCreate.map((address) => (
            <ZKProof contractAddress={address} key={address} />
          ))}
        </ContractListContainer>
      )}
    </>
  )
}

export default function () {
  return (
    <Suspense
      fallback={
        <BodyText size="base">
          Fetching the supported tokens owned by you...
        </BodyText>
      }
    >
      <ContractList />
    </Suspense>
  )
}
