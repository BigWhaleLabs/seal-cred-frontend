import { BodyText } from 'components/Text'
import { ProofOrdering } from 'models/Proof'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import ContractListContainer from 'components/ContractListContainer'
import ProofStore from 'stores/ProofStore'
import WalletStore from 'stores/WalletStore'
import ZKProof from 'components/ZKProof'

function ContractList() {
  const { proofsInProgress } = useSnapshot(ProofStore)
  const { account } = useSnapshot(WalletStore)

  if (!account) {
    return null
  }

  return (
    <>
      {!!proofsInProgress.length && (
        <ContractListContainer>
          {Array.from(proofsInProgress)
            .sort((a, b) => {
              if (
                typeof a.position !== undefined &&
                typeof b.position !== undefined
              ) {
                return (a?.position ?? 0) - (b?.position ?? 0)
              }
              return ProofOrdering[a.status] - ProofOrdering[b.status]
            })
            .map((proof) => (
              <ZKProof proof={proof} key={proof.id} />
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
