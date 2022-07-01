import { BadgeText } from 'components/Text'
import { ComponentChild } from 'preact'
import classnames, {
  alignItems,
  display,
  flex,
  flexDirection,
  justifyContent,
  overflow,
  space,
  textAlign,
  textOverflow,
  whitespace,
  width,
  wordBreak,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const badgeBody = (leanLeft?: boolean, small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    flex('flex-1'),
    width('w-full'),
    justifyContent(
      leanLeft
        ? small
          ? 'justify-center'
          : 'justify-start'
        : 'justify-center',
      'lg:justify-center'
    ),
    space('space-y-2'),
    alignItems(
      leanLeft ? (small ? 'items-center' : 'items-start') : 'items-center',
      'lg:items-center'
    ),
    textAlign(
      leanLeft ? (small ? 'text-center' : 'text-left') : 'text-center',
      'lg:text-center'
    ),
    wordBreak('break-words'),
    whitespace('whitespace-nowrap'),
    overflow('overflow-hidden'),
    textOverflow('text-ellipsis')
  )

const badgeBlockName = classnames(width('w-full'), textOverflow('truncate'))

export default function BadgeCard({
  top,
  leanLeft,
  text,
  bottom,
}: {
  top: ComponentChild
  leanLeft?: boolean
  text: ComponentChild
  bottom: ComponentChild
}) {
  const { xxs, sm } = useBreakpoints()
  const small = xxs && !sm

  return (
    <>
      {top}
      <div className={badgeBody(leanLeft, small)}>
        <div className={badgeBlockName}>
          <BadgeText small>{text}</BadgeText>
        </div>
        {bottom}
      </div>
    </>
  )
}
