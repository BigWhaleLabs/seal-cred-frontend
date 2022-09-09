import { ComponentChildren } from 'preact'
import { HTMLAttributes, useRef } from 'preact/compat'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flex,
  flexDirection,
  flexWrap,
  gap,
  height,
  maxWidth,
  outlineColor,
  outlineOffset,
  outlineStyle,
  padding,
  position,
  textColor,
} from 'classnames/tailwind'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'

const groupContainer = (error?: boolean, disabled?: boolean) =>
  classnames(
    position('relative'),
    display('flex'),
    flexDirection('flex-row'),
    flexWrap('flex-wrap'),
    gap('gap-x-3', 'gap-y-2'),
    padding('p-3'),
    alignItems('items-center'),
    backgroundColor(error ? 'bg-primary-dark-red' : 'bg-primary-dark'),
    borderColor(
      disabled
        ? error
          ? 'border-error-dark'
          : 'border-formal-accent-semi-transparent'
        : error
        ? 'border-error'
        : 'border-formal-accent'
    ),
    borderWidth('border'),
    borderRadius('rounded-md'),
    height('h-fit')
  )

const inputContainer = (
  hasIcon?: boolean,
  error?: boolean,
  disabled?: boolean
) =>
  classnames(
    display('flex'),
    flex('flex-1'),
    backgroundColor('bg-transparent'),
    borderRadius('rounded-md'),
    outlineOffset('outline-2'),
    outlineStyle('outline-none'),
    outlineColor(error ? 'focus:outline-error-dark' : 'focus:outline-primary'),
    textColor(
      disabled
        ? error
          ? 'text-error-semi-transparent'
          : 'text-formal-accent-semi-transparent'
        : error
        ? 'text-error'
        : 'text-formal-accent',
      'focus:text-formal-accent'
    )
  )

const valueWrapper = classnames(
  backgroundColor('bg-primary-dimmed'),
  borderRadius('rounded-3xl'),
  alignItems('items-center'),
  padding('px-2', 'py-1'),
  height('h-7'),
  maxWidth('max-w-200')
)

export default function ({
  value,
  valueList,
  leftIcon,
  isError,
  disabled,
  ...rest
}: {
  leftIcon?: ComponentChildren
  value?: string
  valueList?: string[]
  isError?: boolean
  disabled?: boolean
} & HTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef(null)

  return (
    <div className={groupContainer(isError, disabled)}>
      {leftIcon && <div className={height('h-full')}>{leftIcon}</div>}
      {valueList?.map((value) => (
        <div className={valueWrapper}>{truncateMiddleIfNeeded(value, 21)}</div>
      ))}
      <input
        value={value}
        disabled={disabled}
        ref={inputRef}
        className={inputContainer(!!leftIcon, isError, disabled)}
        {...rest}
      />
    </div>
  )
}
