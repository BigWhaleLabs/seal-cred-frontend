import { BadgeText, ProofText } from 'components/Text'
import { sendEmail } from 'helpers/attestor'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import EmailDomainStore from 'stores/EmailDomainStore'
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
  flex,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  justifyContent,
  lineHeight,
  margin,
  opacity,
  space,
  textColor,
  textDecoration,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'
import useEmailForm from 'hooks/useEmailForm'

const arrowContainer = classnames(
  display('flex'),
  alignItems('items-center'),
  space('space-x-2')
)

const getStartedText = (open: boolean) =>
  classnames(
    textColor('text-transparent', 'active:text-accent'),
    transitionProperty('transition-colors'),
    backgroundClip('bg-clip-text'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-secondary', 'to-accent'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    lineHeight('leading-5'),
    fontSize('text-sm'),
    animation(open ? 'animate-unreveal' : 'animate-reveal')
  )

const emailTitleContainer = classnames(
  display('flex'),
  justifyContent('justify-between'),
  alignItems('items-center')
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

const textButton = classnames(
  textDecoration('underline'),
  opacity('disabled:opacity-75')
)

const questionBlock = (open: boolean) =>
  animation(open ? 'animate-reveal' : 'animate-unreveal')

const tooltipWrapper = classnames(display('flex'), flex('flex-1'))

export default function () {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { xs } = useBreakpoints()

  const { emailDomain } = useSnapshot(EmailDomainStore)
  const { email, setEmail, emailIsValid } = useEmailForm()
  const [domain, setDomain] = useState<string | undefined>()

  function resetEmail(withStore = false) {
    if (withStore) EmailDomainStore.emailDomain = undefined
    setEmail('')
    setDomain(undefined)
  }
  function jumpToToken() {
    setDomain(emailDomain)
  }

  async function onSendEmail(email: string) {
    setLoading(true)
    try {
      const recipientDomain = email.split('@')[1]
      setDomain(recipientDomain)
      EmailDomainStore.emailDomain = recipientDomain
      await sendEmail(email)
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
      resetEmail(true)
    } finally {
      setLoading(false)
      setOpen(false)
      resetEmail()
    }
  }

  const popoverText =
    'When you submit your email, we create a token out of your email’s domain. You can then use that token to create zk proof. Once made, that zk proof will allow you to mint a zkBadge for your wallet.'

  return (
    <Line breakWords>
      <div className={proofLineContainer}>
        <div className={emailTitleContainer}>
          <div className={emailTitleLeft}>
            <ProofText>Work email</ProofText>
            <div className={tooltipWrapper}>
              <ToolTip
                position="floating"
                text={popoverText}
                fitContainer
                disabled={!open}
              >
                <div className={questionBlock(open)}>
                  <QuestionMark small />
                </div>
              </ToolTip>
            </div>
          </div>
          <button className={arrowContainer} onClick={() => setOpen(!open)}>
            {!xs && (
              <span className={getStartedText(open)}>
                {emailDomain ? 'Set token' : 'Get started'}
              </span>
            )}
            <div className={width('w-4')}>
              <Arrow pulseDisabled open={open} />
            </div>
          </button>
        </div>
        {open && (
          <>
            <div className={margin('mt-4')}>
              <BadgeText>
                {domain ? (
                  <>
                    A token has been sent to{' '}
                    <b>{email ? email : `@${domain}`}</b>. Copy the token and
                    add it here to create zk proof. Or{' '}
                    <button
                      className={textButton}
                      onClick={resetEmail}
                      disabled={loading}
                    >
                      re-enter email
                    </button>
                    .
                  </>
                ) : (
                  <>
                    Add your work email and we’ll send you a token for that
                    email (check the spam folder). Then, use the token here to
                    create zk proof.{' '}
                    {emailDomain ? (
                      <button
                        className={textButton}
                        onClick={jumpToToken}
                        disabled={loading}
                      >
                        Have an existing token?
                      </button>
                    ) : null}
                  </>
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
                value={email}
                onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                isValid={emailIsValid}
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
