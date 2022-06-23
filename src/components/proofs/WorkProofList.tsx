import { AccentText, BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import ProofSection from 'components/ProofSection'
import ReadyWorkProof from 'components/proofs/ReadyWorkProof'
import WorkProof from 'components/proofs/WorkProof'
import workProofStore from 'stores/WorkProofStore'

export default function () {
  const { proofsCompleted } = useSnapshot(workProofStore)
  return (
    <ProofSection
      title={
        <BodyText>
          Additional proofs{' '}
          <AccentText color="text-tertiary" bold>
            New!
          </AccentText>
        </BodyText>
      }
    >
      {Array.from(proofsCompleted).map((proof) => (
        <ReadyWorkProof proof={proof} key={proof.domain + Math.random()} />
      ))}
      <WorkProof />
    </ProofSection>
  )
}
