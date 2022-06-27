import { BadgeText } from 'components/Text'
import { sendEmail } from 'helpers/attestor'
import { textDecoration } from 'classnames/tailwind'
import { useState } from 'preact/hooks'
import EmailForm from 'components/EmailForm'
import ProofStore from 'stores/ProofStore'
import TextForm from 'components/TextForm'
import checkDomainToken from 'helpers/checkDomainToken'

export default function ({
  onCreate,
  onChange,
}: {
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
      <BadgeText>
        {domain ? (
          <>
            A token has been sent to ${email}. Copy the token and add it here to
            create zk proof. Or{' '}
            <button
              className={textDecoration('underline')}
              onClick={resetEmail}
            >
              re-enter email
            </button>
          </>
        ) : (
          `Add your work email and we’ll send you a token for that email. Then, use the token here to create zk proof`
        )}
      </BadgeText>
      {domain ? (
        <TextForm
          submitText="Generate proof"
          placeholder="Paste token here"
          onSubmit={onGenerateProof}
          loading={loading}
          error={error}
        />
      ) : (
        <EmailForm
          submitText="Submit email"
          placeholder="Work email..."
          onSubmit={onSendEmail}
          loading={loading}
        />
      )}
    </>
  )
}
