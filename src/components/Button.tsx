import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import { observer } from 'mobx-react-lite'
import AppStore, { Theme } from 'stores/AppStore'

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

const button = (props: ButtonProps, theme: Theme) =>
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
    typeButton(props.type, theme)
  )

const typeButton = (type: ButtonType, theme: Theme) =>
  classnames(
    type === 'accent'
      ? 'bg-accent'
      : type === 'primary'
      ? 'bg-primary'
      : type === 'success'
      ? 'bg-success'
      : 'bg-error-light',
    type === 'primary' && theme === 'dark' ? 'text-semi-background' : null
  )

const Button: FC<ButtonPropsExtend> = ({ wide, type, onClick, children }) => {
  const theme = AppStore.theme
  return (
    <button
      className={button({ type, wide }, theme)}
      onClick={onClick || undefined}
    >
      {children}
    </button>
  )
}

export default observer(Button)
