import { TextButton } from 'components/ui/Text'
import { sendEmails } from 'helpers/proofs/attestor'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailForm from 'components/ui/EmailForm'
import EmailFormStore from 'stores/EmailFormStore'
import FormDescription from 'components/proofs/EmailProof/FormDescription'
import ProofModel from 'models/Proof'
import TextForm from 'components/ui/TextForm'
import checkDomainToken from 'helpers/proofs/checkDomainToken'
import data from 'data'
import proofStore from 'stores/ProofStore'
import useBreakpoints from 'hooks/useBreakpoints'

export default function ({
  domain,
  token,
  submitType = 'secondary',
  error,
  onError,
  onCreate,
  onChange,
  afterSendEmail,
  onGenerationStarted,
  jumpToToken,
  forFlow,
}: {
  domain: string
  token?: string
  submitType?: 'primary' | 'secondary' | 'tertiary'
  error: string | undefined
  onError: (error: string | undefined) => void
  onCreate: (proof: ProofModel) => void
  onChange: (domain: string) => void
  afterSendEmail?: () => void
  onGenerationStarted?: (state: boolean) => void
  jumpToToken: () => void
  forFlow?: boolean
}) {
  const { loading } = useSnapshot(EmailFormStore)
  const [email, setEmail] = useState<string>('')
  const { xxs } = useBreakpoints()

  function resetEmail(withStore = false) {
    if (withStore) EmailDomainStore.emailDomain = ''

    setEmail('')
    onChange('')
  }

  async function onSendEmails(emails: string[]) {
    onGenerationStarted && onGenerationStarted(true)
    EmailFormStore.loading = true
    try {
      await sendEmails(emails)
      afterSendEmail && afterSendEmail()
      const domain = emails[0].split('@')[1]
      EmailDomainStore.emailDomain = domain
      onChange(domain)
    } finally {
      EmailFormStore.loading = false
      onGenerationStarted && onGenerationStarted(false)
    }
  }

  async function onGenerateProof(secret: string) {
    if (!domain) return onError("Looks like you didn't enter an email.")
    if (!checkDomainToken(secret))
      return onError('This is an invalid token. Please try again.')

    onGenerationStarted && onGenerationStarted(true)

    EmailFormStore.loading = true
    onError(undefined)
    try {
      const proof = await data['Email'].createProof(
        proofStore['Email'],
        domain,
        { secret }
      )

      if (proof) {
        EmailFormStore.emailList = []
        onCreate(proof)
      }
    } finally {
      EmailFormStore.loading = false
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
      <FormDescription forFlow={forFlow} jumpToToken={jumpToToken} />
      <EmailForm
        submitType={submitType}
        placeholder={xxs ? 'Email addresses' : 'Email addresses (minimum 10)'}
        onSubmit={onSendEmails}
        loading={loading}
      />
    </>
  )
}
