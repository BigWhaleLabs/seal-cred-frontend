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
  padding,
  position,
  width,
} from 'classnames/tailwind'

const groupContainer = classnames(
  position('relative'),
  display('flex'),
  flexDirection('flex-row'),
  width('w-full'),
  borderColor('border-formal-accent'),
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

const inputContainer = (hasIcon?: boolean) =>
  classnames(
    width('w-full'),
    padding(hasIcon ? 'pl-10' : 'pl-3'),
    backgroundColor('bg-transparent'),
    outlineColor('outline-primary')
  )

export default function ({
  value,
  leftIcon,
  ...rest
}: {
  leftIcon?: ComponentChildren
  value?: string
} & HTMLAttributes<HTMLInputElement>) {
  return (
    <div className={groupContainer}>
      {leftIcon && <div className={iconContainer}>{leftIcon}</div>}
      <input value={value} className={inputContainer(!!leftIcon)} {...rest} />
    </div>
  )
}
