import { BadgeText } from 'components/Text'
import { margin, textDecoration } from 'classnames/tailwind'
import { sendEmail } from 'helpers/attestor'
import { useState } from 'preact/hooks'
import EmailForm from 'components/EmailForm'
import ProofStore from 'stores/ProofStore'
import TextForm from 'components/TextForm'
import checkDomainToken from 'helpers/checkDomainToken'

export default function ({
  description,
  submitType = 'secondary',
  onCreate,
  onChange,
}: {
  submitType?: 'primary' | 'secondary' | 'tertiary'
  description: string
  onCreate: (params: { domain?: string }) => void
  onChange: (params: { domain?: string }) => void
}) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const domain = email ? email.split('@')[1] : ''

  function resetEmail() {
    setEmail(undefined)
    onChange({})
  }

  async function onSendEmail(email: string) {
    setLoading(true)
    try {
      await sendEmail(email)
      setEmail(email)
    } finally {
      setLoading(false)
      const domain = email ? email.split('@')[1] : ''
      onChange({ domain })
    }
  }

  async function onGenerateProof(secret: string) {
    if (!checkDomainToken(secret))
      return setError(
        'This is an invalid token. Try re-entering your email to get a new token.'
      )

    setLoading(true)
    setError(undefined)
    try {
      if (secret) await ProofStore.generateEmail(domain, secret)
    } finally {
      setLoading(false)
      setEmail(undefined)
      onCreate({ domain })
    }
  }

  return (
    <>
      <div className={margin('mt-4')}>
        <BadgeText>
          {domain ? (
            <>
              A token has been sent to {email}. Copy the token and add it here
              to create zk proof. Or{' '}
              <button
                className={textDecoration('underline')}
                onClick={resetEmail}
              >
                re-enter email
              </button>
              .
            </>
          ) : (
            description
          )}
        </BadgeText>
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
