import { ComponentChildren } from 'preact'
import { HTMLAttributes, StateUpdater } from 'preact/compat'
import Button from 'components/proofs/ProofButton'
import Cross from 'icons/Cross'
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
  width,
} from 'classnames/tailwind'
import removeFromArrByIndex from 'helpers/removeFromArrByIndex'
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
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-1'),
  backgroundColor('bg-primary-dimmed'),
  borderRadius('rounded-3xl'),
  alignItems('items-center'),
  padding('px-2', 'py-1'),
  height('h-7'),
  maxWidth('max-w-250')
)

export default function ({
  value,
  valueList,
  setValueList,
  leftIcon,
  isError,
  disabled,
  ...rest
}: {
  leftIcon?: ComponentChildren
  value?: string
  valueList?: string[]
  setValueList?: StateUpdater<string[]>
  isError?: boolean
  disabled?: boolean
} & HTMLAttributes<HTMLInputElement>) {
  return (
    <div className={groupContainer(isError, disabled)}>
      {leftIcon && <div className={height('h-full')}>{leftIcon}</div>}
      {setValueList &&
        valueList?.map((value, index) => (
          <div className={valueWrapper}>
            {truncateMiddleIfNeeded(value, 21)}
            <Button
              onClick={() => {
                setValueList(removeFromArrByIndex(valueList, index))
              }}
            >
              <div className={width('w-4')}>
                <Cross />
              </div>
            </Button>
          </div>
        ))}
      <input
        value={value}
        disabled={disabled}
        className={inputContainer(!!leftIcon, isError, disabled)}
        onKeyDown={(e) => {
          if (valueList && setValueList && !value && e.code === 'Backspace')
            setValueList(removeFromArrByIndex(valueList, valueList.length))
        }}
        {...rest}
      />
    </div>
  )
}
