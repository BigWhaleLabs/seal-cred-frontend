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

const questionStyles = (size?: Sizes, disabled?: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    fontSize(size === Sizes.Small ? 'text-xs' : 'text-base'),
    fontFamily('font-primary'),
    cursor(disabled ? undefined : 'cursor-pointer')
  )

const borderWrapper = (size?: Sizes) => {
  return classnames(
    boxSizing('box-content'),
    borderRadius('rounded-full'),
    borderWidth('border'),
    borderColor('border-current'),
    width({
      'w-4': size === Sizes.Small,
      'w-5': size === Sizes.Medium,
      'w-6': !size,
    }),
    height({
      'h-4': size === Sizes.Small,
      'h-5': size === Sizes.Medium,
      'h-6': !size,
    }),
    display('flex'),
    justifyContent('justify-center')
  )
}
export enum MarkType {
  Question = '?',
  Exclamation = '!',
}

export enum Sizes {
  Small = 'Small',
  Medium = 'Medium',
}

export default function ({
  size,
  disabled,
  mark = MarkType.Question,
}: {
  size?: Sizes
  disabled?: boolean
  mark?: MarkType
}) {
  return (
    <div className={borderWrapper(size)}>
      <div className={questionStyles(size, disabled)}>{mark}</div>
    </div>
  )
}
