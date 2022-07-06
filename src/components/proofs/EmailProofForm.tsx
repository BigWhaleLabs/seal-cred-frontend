import { BodyText, TextButton } from 'components/Text'
import { ComponentChildren } from 'preact'
import { margin } from 'classnames/tailwind'
import { sendEmail } from 'helpers/attestor'
import { useState } from 'preact/hooks'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailForm from 'components/EmailForm'
import ProofStore from 'stores/ProofStore'
import TextForm from 'components/TextForm'
import checkDomainToken from 'helpers/checkDomainToken'

export default function ({
  domain,
  description,
  submitType = 'secondary',
  onCreate,
  onChange,
}: {
  domain: string
  submitType?: 'primary' | 'secondary' | 'tertiary'
  description: ComponentChildren
  onCreate: (domain: string) => void
  onChange: (domain: string) => void
}) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string | undefined>()

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
    if (!domain) return setError("Looks like you didn't enter an email.")
    if (!checkDomainToken(secret))
      return setError('This is an invalid token. Please try again.')

    setLoading(true)
    setError(undefined)
    try {
      if (secret) await ProofStore.generateEmail(domain, secret)
    } finally {
      setLoading(false)
      resetEmail(true)
      onCreate(domain)
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
