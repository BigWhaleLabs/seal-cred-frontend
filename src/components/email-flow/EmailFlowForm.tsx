import { AccentText, BodyText, HeaderText } from 'components/Text'
import EmailProofForm from 'components/proofs/EmailProofForm'
import TinyMessage from 'components/TinyMessage'
import classnames, { space, width } from 'classnames/tailwind'

const proofLineContainer = classnames(space('space-y-4'), width('w-full'))

export default function EmailFlowForm({
  domain,
  onUpdateDomain,
}: {
  domain?: string
  onUpdateDomain: (data: { domain?: string }) => void
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
        <EmailProofForm onChange={onUpdateDomain} onCreate={onUpdateDomain} />
        <TinyMessage
          state="primary"
          text="Be sure to check your spam folder if you don’t see the email at first."
        />
      </div>
    </>
  )
}
