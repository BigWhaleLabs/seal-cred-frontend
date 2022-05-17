import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ProofStore from 'stores/ProofStore'
import ZKProof from 'components/ZKProof'
import sortProofs from 'helpers/sortProofs'

function ContractList() {
  const { proofsInProgress } = useSnapshot(ProofStore)

  return (
    <>
      {!!proofsInProgress.length && (
        <ContractListContainer>
          {sortProofs(proofsInProgress).map((proof) => (
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
