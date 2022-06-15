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
  height,
  justifyContent,
  margin,
  padding,
  space,
  width,
} from 'classnames/tailwind'

const zkProofButton = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-center'),
  width('w-mobile-card', 'sm:w-card'),
  backgroundColor('bg-primary-background'),
  space('space-x-2'),
  padding('py-4'),
  margin('mx-auto'),
  cursor('cursor-pointer'),
  borderRadius('rounded-2xl')
)

const questionStyles = classnames(
  fill('fill-accent'),
  width('w-6'),
  height('h-6'),
  borderRadius('rounded-full'),
  borderWidth('border'),
  borderColor('border-accent'),
  display('flex'),
  justifyContent('justify-center'),
  alignItems('items-center')
)

const QuestionMark = () => {
  return <div className={questionStyles}>?</div>
}

export default function () {
  const popoverText =
    'In your wallet(s), you have NFTs that can point back to your identity (aka, getting doxxed). But with ZK proof, you can verify ownership of NFTs while staying pseudonymous.'

  return (
    <ToolTip arrow position="top" text={popoverText}>
      <div className={zkProofButton}>
        <AccentText color="text-accent">What's a ZK proof?</AccentText>
        <AccentText small primary color="text-accent">
          <QuestionMark />
        </AccentText>
      </div>
    </ToolTip>
  )
}
