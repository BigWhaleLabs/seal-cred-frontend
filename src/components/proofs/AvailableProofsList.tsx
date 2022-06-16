import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { padding } from 'classnames/tailwind'
import ContractListContainer from 'components/proofs/ContractListContainer'
import Proof from 'components/proofs/Proof'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

function AvailableProofsListSuspended() {
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()
  return (
    <>
      {!!proofAddressesAvailableToCreate.length && (
        <ContractListContainer>
          {proofAddressesAvailableToCreate.map((address) => (
            <Proof contractAddress={address} key={address} />
          ))}
        </ContractListContainer>
      )}
    </>
  )
}

const container = padding('py-2')
export default function () {
  return (
    <Suspense
      fallback={
        <div className={container}>
          <BodyText>Fetching the supported tokens owned by you...</BodyText>
        </div>
      }
    >
      <AvailableProofsListSuspended />
    </Suspense>
  )
}
