import { BodyText } from 'components/Text'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import EmailProofForm from 'components/proofs/Email/EmailProofForm'
import Line from 'components/proofs/Line'
import QuestionMark from 'components/QuestionMark'
import ToolTip from 'components/ToolTip'
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
import useBreakpoints from 'hooks/useBreakpoints'

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
  alignItems('items-center')
)

export default function () {
  const [form, updateForm] = useState<{ domain?: string }>({})
  const [open, setOpen] = useState(true)
  const { xs } = useBreakpoints()

  const showButtonText = !xs ? !open : false
  const popoverText =
    'When you submit your email, we create a token out of your email’s domain. You can then use that token to create zk proof. Once made, that zk proof will allow you to mint a zkBadge for your wallet.'

  function onCreate() {
    setOpen(false)
    updateForm({})
  }

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
              {showButtonText && (
                <span>{!form.domain ? 'Get started' : 'Set token'}</span>
              )}
              <Arrow disabled vertical turnDown={open} />
            </button>
          </div>
        </ToolTip>
        {open && <EmailProofForm onCreate={onCreate} onChange={updateForm} />}
      </div>
    </Line>
  )
}
