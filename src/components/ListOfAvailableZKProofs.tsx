import { BodyText } from 'components/Text'
import { Suspense } from 'preact/compat'
import ContractListContainer from 'components/ContractListContainer'
import ZkProof from 'components/ZkProof'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

function ContractList() {
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()

  return (
    <>
      {!!proofAddressesAvailableToCreate.length && (
        <ContractListContainer>
          {proofAddressesAvailableToCreate.map((address) => (
            <ZkProof contractAddress={address} key={address} />
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
        <BodyText>Fetching the supported tokens owned by you...</BodyText>
      }
    >
      <ContractList />
    </Suspense>
  )
}
