import { AccentText, BodyText } from 'components/Text'
import ProofSection from 'components/ProofSection'
import WorkProof from 'components/proofs/WorkProof'

export default function () {
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
      <WorkProof />
    </ProofSection>
  )
}
