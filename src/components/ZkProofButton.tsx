import { AccentText } from 'components/Text'
import ToolTip from 'components/ToolTip'
import classnames, {
  backgroundColor,
  cursor,
  display,
  fill,
  flexDirection,
  fontFamily,
  fontSize,
  justifyContent,
  margin,
  padding,
  space,
  stroke,
} from 'classnames/tailwind'

const zkProofButton = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-center'),
  backgroundColor('bg-blue-800'),
  space('space-x-2'),
  padding('py-4'),
  margin('my-6'),
  cursor('cursor-pointer')
)

const circleStyles = classnames(fill('fill-blue-800'), stroke('stroke-yellow'))
const textStyles = classnames(
  fontFamily('font-primary'),
  fontSize('text-sm'),
  fill('fill-yellow')
)

const QuestionMark = () => {
  return (
    <svg width="22" height="22">
      <circle cx="11" cy="11" r="10" className={circleStyles} strokeWidth="1" />
      <text
        x="50%"
        y="50%"
        dy=".4em"
        text-anchor="middle"
        className={textStyles}
      >
        ?
      </text>
    </svg>
  )
}

const ZkProofButton = () => {
  const popoverText =
    'In your wallet(s), you have NFTs that can point back to your identity (aka, getting doxxed). But with ZK proof, you can verify ownership of NFTs while staying pseudonymous.'

  return (
    <>
      <div className={zkProofButton} data-tip={popoverText}>
        <AccentText active>What’s ZK proof?</AccentText>
        <QuestionMark />
      </div>
      <ToolTip place="bottom" dataFor={popoverText} clickable />
    </>
  )
}

export default ZkProofButton
