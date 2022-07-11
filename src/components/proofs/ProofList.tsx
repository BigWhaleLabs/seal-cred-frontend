import { AccentText, BodyText } from 'components/Text'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import ERC721ProofSections from 'components/proofs/ERC721ProofSections'
import EmailProof from 'components/proofs/EmailProof'
import ProofStore from 'stores/ProofStore'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Scrollbar from 'components/Scrollbar'
import Section from 'components/Section'

export default function () {
  const { emailProofsCompleted, proofsCompleted } = useSnapshot(ProofStore)

  const hasCompletedProofs = proofsCompleted.length > 0

  return (
    <>
      <Scrollbar>
        <div className={space('space-y-2')}>
          <ERC721ProofSections />

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
        </div>
      </Scrollbar>
      {hasCompletedProofs && (
        <AccentText small primary color="text-primary">
          Created ZK proofs are saved in the browser even if you switch wallets.
        </AccentText>
      )}
    </>
  )
}
