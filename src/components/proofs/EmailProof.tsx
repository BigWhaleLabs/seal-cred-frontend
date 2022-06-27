import { BadgeText, ProofText } from 'components/Text'
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
  animation,
  backgroundClip,
  backgroundImage,
  display,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  justifyContent,
  lineHeight,
  margin,
  space,
  textColor,
  textDecoration,
  transitionProperty,
  visibility,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const arrowContainer = classnames(
  textColor('text-transparent', 'active:text-accent'),
  transitionProperty('transition-colors'),
  backgroundClip('bg-clip-text'),
  backgroundImage('bg-gradient-to-r'),
  gradientColorStops('from-secondary', 'to-accent'),
  display('flex'),
  alignItems('items-center'),
  space('space-x-2'),
  fontWeight('font-bold')
)

const getStartedText = classnames(
  fontWeight('font-bold'),
  fontFamily('font-primary'),
  lineHeight('leading-5'),
  fontSize('text-sm')
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
  alignItems('items-center')
)

const revealAnimation = (open: boolean) =>
  classnames(
    animation(open ? 'animate-reveal' : 'animate-unreveal'),
    visibility(open ? 'visible' : 'invisible')
  )

export default function () {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const { xs } = useBreakpoints()

  const domain = email ? email.split('@')[1] : ''

  function resetEmail() {
    setEmail(undefined)
  }

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
      setOpen(false)
      setEmail(undefined)
    }
  }

  const showButtonText = !xs ? !open : false
  const popoverText =
    'When you submit your email, we create a token out of your email’s domain. You can then use that token to create zk proof. Once made, that zk proof will allow you to mint a zkBadge for your wallet.'

  return (
    <Line breakWords>
      <div className={proofLineContainer}>
        <ToolTip
          position="bottom"
          text={popoverText}
          fitContainer
          disabled={!open}
        >
          <div className={emailTitleContainer}>
            <div className={emailTitleLeft}>
              <ProofText>Work email</ProofText>
              <div className={revealAnimation(open)}>
                <QuestionMark small />
              </div>
            </div>
            <button className={arrowContainer} onClick={() => setOpen(!open)}>
              {showButtonText && (
                <span className={getStartedText}>
                  {!domain ? 'Get started' : 'Set token'}
                </span>
              )}
              <div className={width('w-4')}>
                <Arrow pulseDisabled open={open} />
              </div>
            </button>
          </div>
        </ToolTip>
        {open && (
          <>
            <div className={margin('mt-4')}>
              <BadgeText>
                {domain ? (
                  <>
                    A token has been sent to ${email}. Copy the token and add it
                    here to create zk proof. Or{' '}
                    <button
                      className={textDecoration('underline')}
                      onClick={resetEmail}
                    >
                      re-enter email.
                    </button>
                  </>
                ) : (
                  `Add your work email and we’ll send you a token for that email. Then, use the token here to create zk proof.`
                )}
              </BadgeText>
            </div>
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
