import {
  AccentText,
  BodyText,
  HeaderText,
  TextButton,
  TinyText,
} from 'components/Text'
import { useSnapshot } from 'valtio'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailProof from 'helpers/EmailProof'
import EmailProofForm from 'components/proofs/EmailProofForm'
import ReadyEmailProof from 'components/proofs/ReadyEmailProof'
import Separator from 'components/Separator'
import classnames, { space, width } from 'classnames/tailwind'
import proofStore from 'stores/ProofStore'

const proofLineContainer = classnames(space('space-y-4'), width('w-full'))

export default function EmailFlowForm({
  domain,
  onUpdateDomain,
  onSelectProof,
}: {
  domain: string
  onUpdateDomain: (domain: string) => void
  onSelectProof: (proof: EmailProof) => void
}) {
  const { emailProofsCompleted } = useSnapshot(proofStore)
  const { emailDomain } = useSnapshot(EmailDomainStore)

  return (
    <>
      <HeaderText extraLeading>
        {domain
          ? 'A token has been sent to your email!'
          : 'Zero knowledge proof for work'}
      </HeaderText>
      {!domain && emailProofsCompleted.length === 0 && (
        <BodyText>
          <span>
            <AccentText color="text-accent">SealCred</AccentText>
            <AccentText color="text-secondary">|work</AccentText>
          </span>{' '}
          allows you to create and add a zkBadge to your wallet that proves you
          work somewhere without exposing your identity
        </BodyText>
      )}
      <div className={proofLineContainer}>
        <EmailProofForm
          domain={domain}
          submitType="primary"
          description={
            <>
              Start by entering your email. We’ll then send you an email
              containing a token. You’ll come back here and enter your token to
              receive your zkBadge.{' '}
              {emailDomain ? (
                <TextButton onClick={() => onUpdateDomain(emailDomain)}>
                  Have an existing token?
                </TextButton>
              ) : null}
            </>
          }
          onChange={onUpdateDomain}
          onCreate={onSelectProof}
        />
        <TinyText color="primary">
          Be sure to check your spam folder if you don’t see the email at first.
        </TinyText>
      </div>
      {!domain && emailProofsCompleted.length > 0 && (
        <>
          <Separator color="accent">OR</Separator>
          <BodyText center>Select a proof to continue</BodyText>
          {Array.from(emailProofsCompleted).map((proof, index) => (
            <div onClick={() => onSelectProof(proof)}>
              <ReadyEmailProof proof={proof} key={`${proof.domain}-${index}`} />
            </div>
          ))}
        </>
      )}
    </>
  )
}
