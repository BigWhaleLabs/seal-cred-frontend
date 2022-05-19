import { BodyText } from 'components/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ProofStore from 'stores/ProofStore'
import ZkProof from 'components/ZkProof'
import sortProofs from 'helpers/sortProofs'

function ContractList() {
  const { proofsInProgress } = useSnapshot(ProofStore)

  return (
    <>
      {!!proofsInProgress.length && (
        <ContractListContainer>
          {sortProofs(proofsInProgress).map((proof) => (
            <ZkProof
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
