import { AccentText, BodyText } from 'components/Text'
import { useSnapshot } from 'valtio'
import EmailProof from 'components/proofs/EmailProof'
import ProofStore from 'stores/ProofStore'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Section from 'components/Section'

export default function () {
  const { emailProofsCompleted } = useSnapshot(ProofStore)
  return (
    <Section
      title={
        <BodyText>
          Additional proofs{' '}
          <AccentText color="text-tertiary" bold>
            New!
          </AccentText>
        </BodyText>
      }
    >
      {Array.from(emailProofsCompleted).map((proof, index) => (
        <ReadyEmailProof proof={proof} key={`${proof.domain}-${index}`} />
      ))}
      <EmailProof />
    </Section>
  )
}
