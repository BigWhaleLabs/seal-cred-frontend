import { AccentText, BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import ProofSection from 'components/ProofSection'
import ProofStore from 'stores/ProofStore'
import ReadyWorkProof from 'components/proofs/ReadyWorkProof'
import WorkProof from 'components/proofs/WorkProof'

export default function () {
  const { workProofsCompleted } = useSnapshot(ProofStore)
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
      {Array.from(workProofsCompleted).map((proof, index) => (
        <ReadyWorkProof proof={proof} key={`${proof.domain}-${index}`} />
      ))}
      <WorkProof />
    </ProofSection>
  )
}
