import { AccentText, BodyText, HeaderText, TinyText } from 'components/Text'
import EmailProofForm from 'components/proofs/EmailProofForm'
import classnames, { space, width } from 'classnames/tailwind'

const proofLineContainer = classnames(space('space-y-4'), width('w-full'))

export default function EmailFlowForm({
  domain,
  onUpdateDomain,
}: {
  domain: string
  onUpdateDomain: (domain: string) => void
}) {
  return (
    <>
      <HeaderText extraLeading>
        {domain
          ? 'A token has been sent to your email!'
          : 'Zero knowledge proof for work'}
      </HeaderText>
      {!domain && (
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
          submitType="primary"
          description="Start by entering your email. We’ll then send you an email containing a token. You’ll come back here and enter your token to receive your zkBadge."
          onChange={onUpdateDomain}
          onCreate={onUpdateDomain}
        />
        <TinyText color="primary">
          Be sure to check your spam folder if you don’t see the email at first.
        </TinyText>
      </div>
    </>
  )
}
