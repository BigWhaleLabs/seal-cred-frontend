import { BadgeText, BodyText } from 'components/Text'
import { sendEmail } from 'helpers/attestor'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import EmailForm from 'components/EmailForm'
import Line from 'components/proofs/Line'
import ProofStore from 'stores/ProofStore'
import QuestionMark from 'components/QuestionMark'
import TextForm from 'components/TextForm'
import ToolTip from 'components/ToolTip'
import checkDomainToken from 'helpers/checkDomainToken'
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

const emailTitleContainer = classnames(
  display('flex'),
  justifyContent('justify-between')
)

const proofLineContainer = classnames(
  space('space-y-2'),
  fontWeight('font-normal'),
  width('w-full')
)

const emailTitleLeft = classnames(
  display('flex'),
  space('space-x-2'),
  justifyContent('justify-center'),
  alignItems('items-center')
)

export default function () {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const [email, setEmail] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

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

  async function onGenerateProof(secret: string) {
    setError(undefined)

    if (!checkDomainToken(secret)) {
      setError(
        'This is an invalid token. Try re-entering your email to get a new token.'
      )
      return
    }

    setLoading(true)
    try {
      if (secret) await ProofStore.generateEmail(domain, secret)
    } finally {
      setLoading(false)
      setOpen(false)
      setEmail(undefined)
    }
  }

  const popoverText =
    'When you submit your email, we create a token out of your email’s domain. You can then use that token to create zk proof. Once made, that zk proof will allow you to mint a zkBadge for your wallet.'

  return (
    <Line breakWords>
      <div className={proofLineContainer}>
        <ToolTip position="bottom" text={popoverText} fitContainer>
          <div className={emailTitleContainer}>
            <div className={emailTitleLeft}>
              <BodyText small>Work email</BodyText>
              <QuestionMark small />
            </div>
            <button className={arrowContainer} onClick={() => setOpen(!open)}>
              {!open && !domain && <span>Get started</span>}
              <Arrow disabled vertical turnDown={open} />
            </button>
          </div>
        </ToolTip>
        {open && (
          <>
            <BadgeText>
              {domain
                ? `A token has been sent to ${email}. Copy the token and add it here to create zk proof. Or re-enter email.`
                : `Add your work email and we’ll send you a token for that email. Then, use the token here to create zk proof.`}
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
        )}
      </div>
    </Line>
  )
}
