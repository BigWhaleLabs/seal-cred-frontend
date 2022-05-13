import { BodyText } from 'components/Text'
import { ProofOrdering } from 'models/Proof'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ProofStore from 'stores/ProofStore'
import ZKProof from 'components/ZKProof'

function ContractList() {
  const { proofsInProgress } = useSnapshot(ProofStore)

  return (
    <>
      {!!proofsInProgress.length && (
        <ContractListContainer>
          {Array.from(proofsInProgress)
            .sort(
              (
                { position: positionA = 0, status: statusA },
                { position: positionB = 0, status: statusB }
              ) =>
                statusA !== statusB
                  ? ProofOrdering[statusA] - ProofOrdering[statusB]
                  : positionA - positionB
            )
            .map((proof) => (
              <ZKProof
                proof={proof}
                contractAddress={proof.contract}
                key={proof.id}
              />
            ))}
        </ContractListContainer>
      )}
    </>
  )
}

export default function ListOfInProgressZKProofs() {
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
