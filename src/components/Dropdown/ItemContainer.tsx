import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  fontFamily,
  maxHeight,
  outlineColor,
  outlineStyle,
  overflow,
  padding,
  transitionProperty,
  width,
} from 'classnames/tailwind'

export const boxStyles = (withPadding?: boolean) =>
  classnames(
    width('w-52'),
    borderRadius('rounded-lg'),
    borderWidth('border'),
    borderColor('border-formal-accent', 'focus:border-formal-accent'),
    outlineColor('focus:outline-primary'),
    outlineStyle('focus:outline'),
    transitionProperty('transition-colors'),
    backgroundColor('bg-primary-dark'),
    alignItems('items-center'),
    fontFamily('font-primary'),
    padding({ 'p-3': withPadding }),
    maxHeight('max-h-64'),
    overflow('overflow-y-auto')
  )

export default function ({
  children,
  withPadding,
}: ChildrenProp & { withPadding?: boolean }) {
  return <div className={boxStyles(withPadding)}>{children}</div>
}
