import { BodyText, TextButton } from 'components/Text'
import { ComponentChildren } from 'preact'
import { margin } from 'classnames/tailwind'
import { sendEmail } from 'helpers/attestor'
import { useState } from 'preact/hooks'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailForm from 'components/EmailForm'
import EmailProof from 'helpers/EmailProof'
import ProofStore from 'stores/ProofStore'
import TextForm from 'components/TextForm'
import checkDomainToken from 'helpers/checkDomainToken'

export default function ({
  domain,
  description,
  submitType = 'secondary',
  error,
  onError,
  onCreate,
  onChange,
  onGenerationStarted,
}: {
  domain: string
  submitType?: 'primary' | 'secondary' | 'tertiary'
  description: ComponentChildren
  error: string | undefined
  onError: (error: string | undefined) => void
  onCreate: (proof: EmailProof) => void
  onChange: (domain: string) => void
  onGenerationStarted?: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')

  function resetEmail(withStore = false) {
    if (withStore) EmailDomainStore.emailDomain = ''
    setEmail('')
    onChange('')
  }

  async function onSendEmail(email: string) {
    setLoading(true)
    try {
      await sendEmail(email)
      const domain = email.split('@')[1]
      EmailDomainStore.emailDomain = domain
      onChange(domain)
    } finally {
      setLoading(false)
    }
  }

  async function onGenerateProof(secret: string) {
    if (!domain) return onError("Looks like you didn't enter an email.")
    if (!checkDomainToken(secret))
      return onError('This is an invalid token. Please try again.')

    if (onGenerationStarted) {
      onGenerationStarted()
    }

    setLoading(true)
    onError(undefined)
    try {
      if (secret) {
        const proof = await ProofStore.generateEmail(domain, secret)
        if (proof) onCreate(proof)
      }
    } finally {
      setLoading(false)
      resetEmail(true)
    }
  }

  return (
    <>
      <div className={margin('mt-4')}>
        <BodyText>
          {domain ? (
            <>
              A token has been sent to <b>{email ? email : `@${domain}`}</b>.
              Copy the token and add it here to create zk proof. Or{' '}
              <TextButton onClick={() => resetEmail()} disabled={loading}>
                re-enter email
              </TextButton>
              .
            </>
          ) : (
            description
          )}
        </BodyText>
      </div>
      {domain ? (
        <TextForm
          submitType={submitType}
          submitText="Generate proof"
          placeholder="Paste token here"
          onSubmit={onGenerateProof}
          loading={loading}
          error={error}
        />
      ) : (
        <EmailForm
          submitType={submitType}
          submitText="Submit email"
          placeholder="Work email..."
          onSubmit={onSendEmail}
          loading={loading}
        />
      )}
    </>
  )
}
