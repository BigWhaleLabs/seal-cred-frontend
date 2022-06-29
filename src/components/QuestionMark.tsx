import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  fontFamily,
  fontSize,
  height,
  justifyContent,
  width,
} from 'classnames/tailwind'

const questionStyles = (small?: boolean, disabled?: boolean) =>
  classnames(
    width(small ? 'w-4' : 'w-6'),
    height(small ? 'h-4' : 'h-6'),
    borderRadius('rounded-full'),
    borderWidth('border'),
    borderColor('border-current'),
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontSize(small ? 'text-xs' : 'text-base'),
    fontFamily('font-primary'),
    cursor(disabled ? undefined : 'cursor-pointer')
  )

export default function ({
  small,
  disabled,
}: {
  small?: boolean
  disabled?: boolean
}) {
  return <div className={questionStyles(small, disabled)}>?</div>
}
