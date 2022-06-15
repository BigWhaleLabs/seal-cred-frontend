import { BadgeText } from 'components/Text'
import { ComponentChild } from 'preact'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  maxWidth,
  space,
  textAlign,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const badgeBody = (leanLeft?: boolean, small?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
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
    )
  )
const badgeBlockName = (small?: boolean) =>
  small ? classNamesToString(maxWidth('max-w-100'), 'line-clamp-2') : undefined

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
  const { xxs, sm, iPhoneSizes } = useBreakpoints()
  const small = xxs && !sm
  return (
    <>
      {top}
      <div className={badgeBody(leanLeft, small)}>
        <div className={badgeBlockName(iPhoneSizes)}>
          <BadgeText small>{text}</BadgeText>
        </div>
        {bottom}
      </div>
    </>
  )
}
