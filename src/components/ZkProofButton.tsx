import { AccentText } from 'components/Text'
import { MutableRef } from 'preact/hooks'
import { useRef } from 'react'
import { useState } from 'preact/hooks'
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
  position,
  space,
  width,
} from 'classnames/tailwind'
import useClickOutside from 'hooks/useClickOutside'

const zkProofButton = classnames(
  display('flex'),
  position('relative'),
  flexDirection('flex-row'),
  justifyContent('justify-center'),
  backgroundColor('bg-primary-background'),
  space('space-x-2'),
  padding('py-4'),
  width('w-mobile-card', 'sm:w-card'),
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
  const [isShow, setIsShow] = useState(false)
  const zkProofButtonRef = useRef() as MutableRef<HTMLDivElement>

  const popoverText =
    'In your wallet(s), you have NFTs that can point back to your identity (aka, getting doxxed). But with ZK proof, you can verify ownership of NFTs while staying pseudonymous.'

  useClickOutside(zkProofButtonRef, () => setIsShow(false))

  return (
    <div
      ref={zkProofButtonRef}
      className={zkProofButton}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      onClick={() => setIsShow(true)}
    >
      <AccentText color="text-accent">What's a ZK proof?</AccentText>
      <AccentText small primary color="text-accent">
        <QuestionMark />
      </AccentText>
      <ToolTip text={popoverText} show={isShow} />
    </div>
  )
}
