import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import Complete from 'components/Complete'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import ProofButton from 'components/ProofButton'
import ProofLine from 'components/ProofLine'
import ProofStore from 'stores/ProofStore'

function ContractList() {
  const { proofsCompleted } = useSnapshot(ProofStore)

  return (
    <>
      {proofsCompleted?.length ? (
        <ContractListContainer>
          {proofsCompleted.map((proof) => (
            <ProofLine>
              <ContractName address={proof.contract} />
              <ProofButton color="yellow">
                <span>Proof made</span>
                <Complete />
              </ProofButton>
            </ProofLine>
          ))}
        </ContractListContainer>
      ) : null}
    </>
  )
}

export default function ListOfReadyZKProofs() {
  return (
    <Suspense
      fallback={
        <BodyText size="base">
          Fetching ready proofs generated by you...
        </BodyText>
      }
    >
      <ContractList />
    </Suspense>
  )
}
