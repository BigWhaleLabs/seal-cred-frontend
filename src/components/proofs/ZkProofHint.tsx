import { AccentText } from 'components/ui/Text'
import Mark from 'components/ui/Mark'
import ToolTip from 'components/ui/ToolTip'
import classnames, {
  backgroundColor,
  borderRadius,
  cursor,
  display,
  flexDirection,
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
  width('w-fit'),
  backgroundColor('bg-primary-background'),
  space('space-x-2'),
  padding('py-4', 'px-4', 'tablet:px-8'),
  margin('mx-auto'),
  cursor('cursor-pointer'),
  borderRadius('rounded-2xl')
)

export default function () {
  const popoverText =
    'In your wallet(s), you have NFTs that can point back to your identity (aka, getting doxxed). But with ZK proofs, you can verify ownership of NFTs while staying pseudonymous.'

  return (
    <ToolTip arrow position="top" text={popoverText}>
      <div className={zkProofButton}>
        <AccentText color="text-accent">What's a ZK proof?</AccentText>
        <AccentText small primary color="text-accent">
          <Mark />
        </AccentText>
      </div>
    </ToolTip>
  )
}
