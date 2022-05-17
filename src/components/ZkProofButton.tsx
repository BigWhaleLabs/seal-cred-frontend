import { AccentText } from 'components/Text'
import ToolTip from 'components/ToolTip'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  fill,
  flexDirection,
  fontFamily,
  fontSize,
  height,
  justifyContent,
  margin,
  padding,
  space,
  textColor,
  width,
} from 'classnames/tailwind'

const zkProofButton = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-center'),
  backgroundColor('bg-accent-background'),
  space('space-x-2'),
  padding('py-4'),
  width('w-mobile-card', 'sm:w-card'),
  margin('mx-auto'),
  cursor('cursor-pointer'),
  borderRadius('rounded-2xl')
)

const questionStyles = classnames(
  fontFamily('font-primary'),
  fontSize('text-sm'),
  fill('fill-primary'),
  width('w-6'),
  height('h-6'),
  borderRadius('rounded-full'),
  borderWidth('border-1'),
  borderColor('border-primary'),
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  textColor('text-primary')
)

const QuestionMark = () => {
  return <div className={questionStyles}>?</div>
}

const ZkProofButton = () => {
  const popoverText =
    'In your wallet(s), you have NFTs that can point back to your identity (aka, getting doxxed). But with ZK proof, you can verify ownership of NFTs while staying pseudonymous.'

  return (
    <>
      <div className={zkProofButton} data-tip={popoverText}>
        <AccentText color="text-primary">What's a ZK proof?</AccentText>
        <QuestionMark />
      </div>
      <ToolTip place="top" dataFor={popoverText} clickable />
    </>
  )
}

export default ZkProofButton
