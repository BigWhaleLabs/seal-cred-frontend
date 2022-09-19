import {
  AccentText,
  BodyText,
  HeaderText,
  TextButton,
  TinyText,
} from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailProofForm from 'components/proofs/EmailProofForm'
import Proof from 'models/Proof'
import UploadEmailListButton from 'components/ui/UploadEmailListButton'
import classnames, {
  display,
  justifyContent,
  space,
  width,
} from 'classnames/tailwind'

const proofLineContainer = classnames(space('space-y-4'), width('w-full'))
const uploadButtonWrapper = classnames(
  display('flex'),
  justifyContent('justify-center')
)

export default function EmailFlowForm({
  domain,
  onUpdateDomain,
  onSelectProof,
}: {
  domain: string
  onUpdateDomain: (domain: string) => void
  onSelectProof: (proof: Proof) => void
}) {
  const { emailDomain } = useSnapshot(EmailDomainStore)
  const [error, setError] = useState<string | undefined>()

  function jumpToToken() {
    setError('')
    onUpdateDomain(emailDomain)
  }

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
            <AccentText color="text-secondary">|echo</AccentText>
          </span>{' '}
          allows you to create and add a zkBadge to your wallet that proves you
          work somewhere without exposing your identity.
        </BodyText>
      )}
      <div className={proofLineContainer}>
        <EmailProofForm
          domain={domain}
          submitType="primary"
          description={
            <>
              Start by entering your email and at least 10 others (but the more
              you add, like 100+, will improve your anonymity). We’ll then send
              you an email containing a token. You’ll come back here and enter
              your token to receive your zk badge.{' '}
              {emailDomain ? (
                <TextButton onClick={() => jumpToToken()}>
                  Have an existing token?
                </TextButton>
              ) : null}
            </>
          }
          onChange={onUpdateDomain}
          onCreate={onSelectProof}
          error={error}
          onError={setError}
        />
        <div className={uploadButtonWrapper}>
          <UploadEmailListButton small center />
        </div>
        <TinyText color="primary">
          Be sure to check your spam folder if you don’t see the email at first.
        </TinyText>
      </div>
    </>
  )
}
