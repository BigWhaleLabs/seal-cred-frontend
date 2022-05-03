import { AccentText } from 'components/Text'
import ToolTip from 'components/ToolTip'
import classnames, {
  backgroundColor,
  cursor,
  display,
  fill,
  flexDirection,
  justifyContent,
  margin,
  maxWidth,
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

const QuestionMark = () => {
  return (
    <svg width="22" height="22">
      <circle
        cx="11"
        cy="11"
        r="10"
        className={classnames(fill('fill-blue-800'), stroke('stroke-yellow'))}
        strokeWidth="1"
      />
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        font-size="14px"
        font-family="Verdana"
        dy=".4em"
        className={fill('fill-yellow')}
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
