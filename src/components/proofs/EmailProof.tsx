import { ProofText, TextButton } from 'components/Text'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailProofForm from 'components/proofs/EmailProofForm'
import Line from 'components/proofs/Line'
import QuestionMark from 'components/QuestionMark'
import ToolTip from 'components/ToolTip'
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
  space,
  textColor,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

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

const questionBlock = (open: boolean) =>
  animation(open ? 'animate-reveal' : 'animate-unreveal')

const tooltipWrapper = classnames(display('flex'), flex('flex-1'))

export default function () {
  const [domain, setDomain] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const { xs } = useBreakpoints()
  const { emailDomain } = useSnapshot(EmailDomainStore)

  function onCreate() {
    setOpen(false)
    setDomain('')
  }

  function jumpToToken() {
    setError(undefined)
    setDomain(emailDomain)
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
                <span>{domain ? 'Set token' : 'Get started'}</span>
              </span>
            )}
            <div className={width('w-4')}>
              <Arrow pulseDisabled open={open} />
            </div>
          </button>
        </div>
        {open && (
          <EmailProofForm
            domain={domain}
            submitType="secondary"
            description={
              <>
                Add your work email and we’ll send you a token for that email
                (check the spam folder). Then, use the token here to create zk
                proof.{' '}
                {emailDomain ? (
                  <TextButton onClick={jumpToToken}>
                    Have an existing token?
                  </TextButton>
                ) : null}
              </>
            }
            onCreate={onCreate}
            onChange={setDomain}
            onError={setError}
            error={error}
          />
        )}
      </div>
    </Line>
  )
}
