import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { padding } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/proofs/ContractListContainer'
import Proof from 'components/proofs/Proof'
import ProofStore from 'stores/ProofStore'
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
  const { proofsCompleted } = useSnapshot(ProofStore)
  return (
    <Suspense
      fallback={
        <div className={proofsCompleted.length ? container : undefined}>
          <BodyText>Fetching the supported tokens owned by you...</BodyText>
        </div>
      }
    >
      <AvailableProofsListSuspended />
    </Suspense>
  )
}
