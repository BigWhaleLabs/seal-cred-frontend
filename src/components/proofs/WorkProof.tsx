import { BadgeText } from 'components/Text'
import { sendEmail } from 'helpers/attestor'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import EmailForm from 'components/EmailForm'
import Line from 'components/proofs/Line'
import TextForm from 'components/TextForm'
import classnames, {
  alignItems,
  backgroundClip,
  backgroundImage,
  display,
  fontWeight,
  gradientColorStops,
  justifyContent,
  space,
  textColor,
  width,
} from 'classnames/tailwind'
import workProofStore from 'stores/WorkProofStore'

const arrowContainer = classnames(
  textColor('text-transparent', 'active:text-accent'),
  backgroundClip('bg-clip-text'),
  backgroundImage('bg-gradient-to-r'),
  gradientColorStops('from-secondary', 'to-accent'),
  display('flex'),
  alignItems('items-center'),
  space('space-x-2'),
  fontWeight('font-bold')
)

const workTitleContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  width('w-full'),
  fontWeight('font-bold')
)

const proofLineContainer = classnames(
  space('space-y-2'),
  fontWeight('font-normal')
)

export default function () {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const [email, setEmail] = useState<string | undefined>()

  const domain = email ? email.split('@')[1] : ''

  async function onSendEmail(email: string) {
    setLoading(true)
    try {
      await sendEmail(email)
      setEmail(email)
    } finally {
      setLoading(false)
    }
  }

  async function onGenerateProof(secret?: string) {
    setLoading(true)
    try {
      if (secret) await workProofStore.generate(domain, secret)
    } finally {
      setLoading(false)
      setOpen(false)
      setEmail(undefined)
    }
  }

  return (
    <Line className={proofLineContainer}>
      <div className={workTitleContainer}>
        <span>{domain ? `Work domain @${domain}` : `Work email`}</span>
        <button className={arrowContainer} onClick={() => setOpen(!open)}>
          {!open && !domain && <span>Get started</span>}
          <Arrow disabled vertical turnDown={open} />
        </button>
      </div>
      {open && (
        <>
          <BadgeText>
            {domain
              ? `A token has been sent to ${email}. Copy the token and add it here to create zk proof. Or re-enter email.`
              : `
                        Add your work email and we’ll send you a token for that email. Then,
                        use the token here to create zk proof.
            `}
          </BadgeText>
          {domain ? (
            <TextForm
              submitText="Generate proof"
              placeholder="Paste token here"
              onSubmit={onGenerateProof}
              loading={loading}
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
      )}
    </Line>
  )
}
