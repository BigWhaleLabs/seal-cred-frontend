import { FC, InputHTMLAttributes } from 'react'
import { classnames } from 'classnames/tailwind'

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  value?: string
  onTextChange: (text: string) => void
  onEnter?: (text: string) => void
}
const textField = classnames(
  'text-secondary',
  'pl-3',
  'pr-2',
  'py-2',
  'w-full',
  'rounded',
  'leading-5',
  'text-sm',
  'bg-semi-background',
  'transition-colors',
  'border',
  'border-transparent',
  'focus:border-border',
  'focus:outline-none'
)
const TextField: FC<ITextField> = ({
  placeholder,
  value,
  onTextChange,
  onEnter,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={textField}
      value={value}
      onChange={(event) => onTextChange(event.target.value)}
      onKeyDown={(event) =>
        onEnter && event.code === 'Enter' ? onEnter(value || '') : null
      }
    />
  )
}

export default TextField
