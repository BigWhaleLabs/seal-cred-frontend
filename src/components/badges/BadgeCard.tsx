import { BadgeText } from 'components/ui/Text'
import { ComponentChild } from 'preact'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
  textAlign,
  textOverflow,
  whitespace,
  width,
  wordBreak,
} from 'classnames/tailwind'

const badgeBody = classnames(
  display('flex'),
  flexDirection('flex-col'),
  width('w-full'),
  justifyContent('justify-center'),
  space('space-y-2'),
  alignItems('items-center'),
  textAlign('text-center'),
  wordBreak('break-words'),
  whitespace('whitespace-nowrap'),
  textOverflow('text-ellipsis')
)

const badgeBlockName = classnames(
  width('w-full'),
  whitespace('whitespace-normal')
)

export default function BadgeCard({
  bottom,
  text,
  top,
}: {
  top: ComponentChild
  text: ComponentChild
  bottom: ComponentChild
}) {
  return (
    <>
      {top}
      <div className={badgeBody}>
        <div className={badgeBlockName}>
          <BadgeText small>{text}</BadgeText>
        </div>
        {bottom}
      </div>
    </>
  )
}
