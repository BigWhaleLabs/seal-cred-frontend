import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

export enum ButtonType {
  accent = 'accent',
  primary = 'primary',
  success = 'success',
  error = 'error',
}

export interface ButtonProps {
  wide?: boolean
  type: ButtonType
}

export interface ButtonPropsExtend extends ButtonProps {
  onClick?: () => void
}

const button = (props: ButtonProps) =>
  classnames(
    'flex',
    'justify-center',
    'items-center',
    'font-primary',
    'font-normal',
    'text-white',
    'text-sm',
    'leading-4',
    'h-6',
    'py-1',
    'px-2',
    'rounded',
    'pointer-events-auto',
    'focus:outline-none',
    'transition-colors',
    props.wide ? 'w-full' : null,
    typeButton(props.type)
  )

const typeButton = (type: ButtonType) =>
  classnames(
    type === 'accent'
      ? 'bg-accent'
      : type === 'primary'
      ? 'bg-primary'
      : type === 'success'
      ? 'bg-success'
      : 'bg-error-light'
  )

const Button: FC<ButtonPropsExtend> = ({ wide, type, onClick, children }) => {
  return (
    <button className={button({ type, wide })} onClick={onClick || undefined}>
      {children}
    </button>
  )
}

export default Button
