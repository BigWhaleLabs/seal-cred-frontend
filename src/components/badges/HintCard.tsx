import { BadgeText } from 'components/Text'
import { ComponentChildren } from 'preact'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  fontSize,
  lineHeight,
  padding,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  borderRadius('rounded-lg'),
  backgroundColor('bg-primary-background'),
  padding('px-4', 'py-4'),
  space('space-y-4'),
  fontSize('text-base'),
  lineHeight('leading-6')
)
export default function ({
  children,
  text,
}: ChildrenProp & {
  text?: ComponentChildren
}) {
  return (
    <div className={container}>
      {text && <BadgeText>{text}</BadgeText>}
      {children}
    </div>
  )
}
