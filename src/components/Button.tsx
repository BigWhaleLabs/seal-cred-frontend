import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Loading from 'components/Loading'

export type ButtonType = 'accent' | 'primary' | 'success' | 'error'

export interface ButtonProps {
  type: ButtonType
  loading?: boolean
  badge?: boolean
}

const button = (type: ButtonType, badge: boolean) =>
  classnames(
    'flex',
    'flex-row',
    'space-x-2',
    'transition-colors',
    !badge ? 'font-bold' : null,
    'text-white',
    badge ? 'py-0' : 'py-4',
    badge ? 'px-2' : 'px-6',
    badge ? 'capitalize' : null,
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
  badge,
  ...rest
}) => {
  return (
    <button
      className={button(type, badge || false)}
      {...rest}
      disabled={loading}
    >
      {loading && <Loading />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default Button
