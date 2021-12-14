import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Loading from 'components/Loading'

export type ButtonType = 'accent' | 'primary' | 'success' | 'error'

export interface ButtonProps {
  type: ButtonType
  loading?: boolean
}

const button = (type: ButtonType) =>
  classnames(
    'flex',
    'flex-row',
    'space-x-2',
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
  loading,
  ...rest
}) => {
  return (
    <button className={button(type)} {...rest} disabled={loading}>
      {loading && <Loading />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default Button
