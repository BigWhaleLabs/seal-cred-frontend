import { ComponentChildren } from 'preact'
import { HTMLAttributes } from 'preact/compat'
import classnames, {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  height,
  outlineColor,
  outlineOffset,
  outlineStyle,
  padding,
  position,
  textColor,
  width,
} from 'classnames/tailwind'

const groupContainer = (error?: boolean, disabled?: boolean) =>
  classnames(
    position('relative'),
    display('flex'),
    flexDirection('flex-row'),
    width('w-full'),
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
    height('h-12')
  )

const iconContainer = classnames(
  position('absolute'),
  height('h-full'),
  display('flex'),
  alignItems('items-center'),
  padding('pl-3')
)

const inputContainer = (
  hasIcon?: boolean,
  error?: boolean,
  disabled?: boolean
) =>
  classnames(
    width('w-full'),
    padding(hasIcon ? 'pl-10' : 'pl-3'),
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

export default function ({
  value,
  leftIcon,
  isError,
  disabled,
  ...rest
}: {
  leftIcon?: ComponentChildren
  value?: string
  isError?: boolean
  disabled?: boolean
} & HTMLAttributes<HTMLInputElement>) {
  return (
    <div className={groupContainer(isError, disabled)}>
      {leftIcon && <div className={iconContainer}>{leftIcon}</div>}
      <input
        value={value}
        disabled={disabled}
        className={inputContainer(!!leftIcon, isError, disabled)}
        {...rest}
      />
    </div>
  )
}
