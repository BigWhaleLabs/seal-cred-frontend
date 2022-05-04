import { BodyText } from 'components/Text'
import { Suspense } from 'react'
import {
  alignItems,
  backgroundColor,
  borderRadius,
  classnames,
  display,
  flexDirection,
  fontSize,
  height,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import Complete from 'components/Complete'
import ContractListContainer from 'components/ContractListContainer'
import ContractName from 'components/ContractName'
import ProofButton from 'components/ProofButton'
import ProofStore from 'stores/ProofStore'

const contractContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  space('space-x-2'),
  backgroundColor('bg-blue-700'),
  borderRadius('rounded-lg'),
  height('h-8'),
  padding('px-4', 'py-1'),
  fontSize('text-sm')
)

function ContractList() {
  const { proofsCompleted } = useSnapshot(ProofStore)

  return (
    <>
      {proofsCompleted?.length ? (
        <ContractListContainer>
          {proofsCompleted.map((proof) => (
            <div className={contractContainer}>
              <ContractName address={proof.contract} />
              <ProofButton color="yellow">
                <span>Proof made</span>
                <Complete />
              </ProofButton>
            </div>
          ))}
        </ContractListContainer>
      ) : null}
    </>
  )
}

export default function ListOfReadyZKProofs() {
  return (
    <Suspense
      fallback={<BodyText>Fetching ready proofs generated by you...</BodyText>}
    >
      <ContractList />
    </Suspense>
  )
}
