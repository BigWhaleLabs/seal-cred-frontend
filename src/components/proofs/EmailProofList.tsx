import { AccentText, BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import EmailProof from 'components/proofs/EmailProof'
import ProofSection from 'components/ProofSection'
import ProofStore from 'stores/ProofStore'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'

export default function () {
  const { proofsCompleted } = useSnapshot(ProofStore['Email'])

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
      {Array.from(proofsCompleted).map((proof, index) => (
        <ReadyEmailProof proof={proof} key={`${proof.origin}-${index}`} />
      ))}
      <EmailProof />
    </ProofSection>
  )
}
