import { ComponentChildren } from 'preact'
import { TextButton } from 'components/ui/Text'
import { sendEmail } from 'helpers/proofs/attestor'
import { useState } from 'preact/hooks'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailForm from 'components/ui/EmailForm'
import ProofModel from 'models/Proof'
import TextForm from 'components/ui/TextForm'
import checkDomainToken from 'helpers/proofs/checkDomainToken'
import data from 'data'
import proofStore from 'stores/ProofStore'

export default function ({
  domain,
  token,
  description,
  submitType = 'secondary',
  error,
  onError,
  onCreate,
  onChange,
  onGenerationStarted,
}: {
  domain: string
  token?: string
  submitType?: 'primary' | 'secondary' | 'tertiary'
  description: ComponentChildren
  error: string | undefined
  onError: (error: string | undefined) => void
  onCreate: (proof: ProofModel) => void
  onChange: (domain: string) => void
  onGenerationStarted?: (state: boolean) => void
}) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')

  function resetEmail(withStore = false) {
    if (withStore) {
      EmailDomainStore.emailDomain = ''
    }
    setEmail('')
    onChange('')
  }

  async function onSendEmail(email: string) {
    onGenerationStarted && onGenerationStarted(true)
    setLoading(true)
    try {
      await sendEmail(email)
      const domain = email.split('@')[1]
      EmailDomainStore.emailDomain = domain
      onChange(domain)
    } finally {
      setLoading(false)
      onGenerationStarted && onGenerationStarted(false)
    }
  }

  async function onGenerateProof(secret: string) {
    if (!domain) return onError("Looks like you didn't enter an email.")
    if (!checkDomainToken(secret))
      return onError('This is an invalid token. Please try again.')

    onGenerationStarted && onGenerationStarted(true)

    setLoading(true)
    onError(undefined)
    try {
      const proof = await data['Email'].createProof(
        proofStore['Email'],
        domain,
        { secret }
      )
      if (proof) onCreate(proof)
    } finally {
      setLoading(false)
      resetEmail(true)
    }
  }

  return domain ? (
    <>
      <div>
        A token has been sent to <b>{email || `@${domain}`}</b>. Copy the token
        and add it here to create a zk proof. Or{' '}
        <TextButton onClick={() => resetEmail()} disabled={loading}>
          re-enter email
        </TextButton>
        .
      </div>
      <TextForm
        value={token}
        submitType={submitType}
        submitText="Generate proof"
        placeholder="Paste token here"
        onSubmit={onGenerateProof}
        loading={loading}
        error={error}
      />
    </>
  ) : (
    <>
      <div>{description}</div>
      <EmailForm
        submitType={submitType}
        submitText="Submit email"
        placeholder="Work email..."
        onSubmit={onSendEmail}
        loading={loading}
      />
    </>
  )
}
