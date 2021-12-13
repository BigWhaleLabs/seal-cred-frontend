import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'

export type ButtonType = 'accent' | 'primary' | 'success' | 'error'

export interface ButtonProps {
  type: ButtonType
}

const button = (type: ButtonType) =>
  classnames(
    'transition-colors',
    'font-bold',
    'text-white',
    'py-4',
    'px-6',
    'rounded',
    'focus:outline-none',
    typeButton(type)
  )

const typeButton = (type: ButtonType) => {
  const { theme } = useSnapshot(AppStore)
  return classnames(
    type === 'accent'
      ? 'bg-accent'
      : type === 'primary'
      ? 'bg-primary'
      : type === 'success'
      ? 'bg-success'
      : 'bg-error-light',
    type === 'primary' && theme === 'dark' ? 'text-semi-background' : null
  )
}

const Button: FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({
  type,
  children,
  ...rest
}) => {
  return (
    <button className={button(type)} {...rest}>
      {children}
    </button>
  )
}

export default Button
