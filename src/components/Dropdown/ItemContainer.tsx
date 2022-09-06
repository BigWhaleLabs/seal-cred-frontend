import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  fontFamily,
  maxHeight,
  outlineColor,
  outlineStyle,
  overflow,
  padding,
  transitionProperty,
} from 'classnames/tailwind'

export const boxStyles = classnames(
  display('flex'),
  flexDirection('flex-col'),
  borderRadius('rounded-lg'),
  borderWidth('border'),
  borderColor('border-formal-accent', 'focus:border-formal-accent'),
  outlineColor('focus:outline-primary'),
  outlineStyle('focus:outline'),
  transitionProperty('transition-colors'),
  backgroundColor('bg-primary-dark'),
  alignItems('items-center'),
  fontFamily('font-primary'),
  padding('p-3'),
  maxHeight('max-h-64'),
  overflow('overflow-y-auto'),
  alignItems('items-start')
)

export default function ({
  children,
}: ChildrenProp & { withPadding?: boolean }) {
  return <div className={boxStyles}>{children}</div>
}
