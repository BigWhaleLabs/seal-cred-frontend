import { BadgeText } from 'components/Text'
import { ComponentChildren } from 'preact'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  fontSize,
  fontWeight,
  lineHeight,
  padding,
  space,
  textAlign,
} from 'classnames/tailwind'

const container = (center?: boolean, small?: boolean, bold?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    borderRadius('rounded-lg'),
    backgroundColor('bg-primary-background'),
    padding('px-4', small ? 'py-2' : 'py-4'),
    space('space-y-4'),
    fontSize('text-sm'),
    lineHeight('leading-6'),
    fontWeight(bold ? 'font-bold' : undefined),
    textAlign(center ? 'text-center' : undefined)
  )
export default function ({
  children,
  text,
  center,
  small,
  bold,
}: ChildrenProp & {
  bold?: boolean
  small?: boolean
  center?: boolean
  text?: ComponentChildren
}) {
  return (
    <div className={container(center, small, bold)}>
      {text && <BadgeText>{text}</BadgeText>}
      {children}
    </div>
  )
}
