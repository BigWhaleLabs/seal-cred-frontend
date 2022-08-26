import { ProofText, TextButton } from 'components/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import Button from 'components/Button'
import EmailDomainStore from 'stores/EmailDomainStore'
import EmailProofForm from 'components/proofs/EmailProofForm'
import Line from 'components/proofs/Line'
import QuestionMark from 'components/QuestionMark'
import SimpleArrow from 'icons/SimpleArrow'
import ToolTip from 'components/ToolTip'
import classnames, {
  TArg,
  alignItems,
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
  opacity,
  space,
  textColor,
  transitionDuration,
  transitionProperty,
  visibility,
  width,
} from 'classnames/tailwind'

const arrowContainer = classnames(
  display('flex'),
  alignItems('items-center'),
  space('space-x-2')
)

const getStartedText = (open: boolean, classes: TArg) =>
  classnames(
    classes,
    textColor('text-transparent', 'active:text-accent'),
    transitionProperty('transition-colors'),
    backgroundClip('bg-clip-text'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-secondary', 'to-accent'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    lineHeight('leading-5'),
    fontSize('text-sm'),
    opacity({ 'opacity-0': open }),
    visibility({ invisible: open }),
    transitionDuration('duration-300')
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
  space('space-x-3'),
  alignItems('items-center')
)

const questionBlock = (open: boolean) =>
  classnames(
    opacity({ 'opacity-0': !open }),
    visibility({ invisible: !open }),
    transitionDuration('duration-300')
  )

const tooltipWrapper = classnames(display('flex'), flex('flex-1'))

export default function () {
  const [domain, setDomain] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [generationStarted, setGenerationStarted] = useState(false)
  const { emailDomain } = useSnapshot(EmailDomainStore)

  function onCreate() {
    setOpen(false)
    setDomain('')
    setGenerationStarted(false)
  }

  function jumpToToken() {
    setError(undefined)
    setDomain(emailDomain)
  }

  const popoverText =
    'When you submit your email, we create a token out of your email’s domain. You can then use that token to create a zk proof. Once made, that zk proof will allow you to mint a zkBadge for your wallet.'

  return (
    <Line breakWords>
      <div className={proofLineContainer}>
        <div className={emailTitleContainer}>
          <div className={emailTitleLeft}>
            {domain && (
              <Button
                disabled={generationStarted}
                type="tertiary"
                onClick={() => {
                  setDomain('')
                }}
              >
                <SimpleArrow />
              </Button>
            )}
            <ProofText>Work email</ProofText>
            <div className={tooltipWrapper}>
              <ToolTip
                position="top"
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
            <span className={getStartedText(open, displayFrom('xs'))}>
              <span>{domain ? 'Set token' : 'Get started'}</span>
            </span>
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
                {!!emailDomain && (
                  <TextButton onClick={jumpToToken}>
                    Have an existing token?
                  </TextButton>
                )}
              </>
            }
            onCreate={onCreate}
            onChange={setDomain}
            onError={setError}
            onGenerationStarted={() => {
              setGenerationStarted(true)
            }}
            error={error}
          />
        )}
      </div>
    </Line>
  )
}
