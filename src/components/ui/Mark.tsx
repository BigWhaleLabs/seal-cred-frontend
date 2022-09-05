import classnames, {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  boxSizing,
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
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontSize(small ? 'text-xs' : 'text-base'),
    fontFamily('font-primary'),
    cursor(disabled ? undefined : 'cursor-pointer')
  )

const borderWrapper = (small?: boolean, medium?: boolean) =>
  classnames(
    boxSizing('box-content'),
    borderRadius('rounded-full'),
    borderWidth('border'),
    borderColor('border-current'),
    width({ 'w-4': small, 'w-5': medium, 'w-6': !small && !medium }),
    height({ 'h-4': small, 'h-5': medium, 'h-6': !small && !medium }),
    display('flex'),
    justifyContent('justify-center')
  )

export enum MarkType {
  Question = '?',
  Exclamation = '!',
}

export default function ({
  small,
  disabled,
  medium,
  mark = MarkType.Question,
}: {
  small?: boolean
  medium?: boolean
  disabled?: boolean
  mark?: MarkType
}) {
  return (
    <div className={borderWrapper(small, medium)}>
      <div className={questionStyles(small, disabled)}>{mark}</div>
    </div>
  )
}
