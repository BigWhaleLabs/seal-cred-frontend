import { ComponentChildren } from 'preact'
import { EmailMapping } from 'stores/EmailFormStore'
import { HTMLAttributes } from 'preact/compat'
import ListedValue from 'components/ui/ListedValue'
import classNamesToString from 'helpers/classNamesToString'
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
  margin,
  maxHeight,
  outlineStyle,
  overflow,
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
    flexWrap('flex-wrap'),
    gap('gap-1.5'),
    padding('p-2', 'xxs:p-3'),
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
    overflow('overflow-y-auto'),
    maxHeight('max-h-32'),
    height('h-fit')
  )

const inputContainer = (error?: boolean, disabled?: boolean) =>
  classnames(
    display('flex'),
    flex('flex-1'),
    backgroundColor('bg-transparent'),
    borderRadius('rounded-md'),
    outlineStyle('outline-none', 'focus-visible:outline-none'),
    textColor(
      disabled
        ? error
          ? 'text-error-semi-transparent'
          : 'text-formal-accent-semi-transparent'
        : error
        ? 'text-error'
        : 'text-formal-accent',
      'focus:text-formal-accent'
    ),
    width('w-32', 'xxs:w-fit')
  )
const iconStyles = classnames(height('h-full'), margin('mr-2'), width('w-3.5'))

export default function ({
  value,
  valueList,
  removeValueFromList,
  leftIcon,
  isError,
  disabled,
  ...rest
}: {
  leftIcon?: ComponentChildren
  value?: string
  valueList?: EmailMapping
  removeValueFromList?: (fileName: string, index: number) => void
  isError?: boolean
  disabled?: boolean
} & HTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={classNamesToString(
        groupContainer(isError, disabled),
        'blue-scrollbar'
      )}
    >
      {leftIcon && <div className={iconStyles}>{leftIcon}</div>}
      {removeValueFromList &&
        valueList &&
        Object.keys(valueList).map((fileName) =>
          valueList[fileName].map(({ email, isOtherDomain }, index) => (
            <ListedValue
              title={email}
              index={index}
              removeValueFromList={() => removeValueFromList(fileName, index)}
              isDifferent={isOtherDomain}
            />
          ))
        )}
      <input
        value={value}
        disabled={disabled}
        className={inputContainer(isError, disabled)}
        {...rest}
      />
    </div>
  )
}
