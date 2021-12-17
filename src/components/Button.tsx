import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Loading from 'components/Loading'

export type ButtonColor = 'accent' | 'primary' | 'success' | 'error'

export interface ButtonProps {
  color: ButtonColor
  loading?: boolean
  badge?: boolean
}

const button = (color: ButtonColor, loading?: boolean, badge?: boolean) =>
  classnames(
    'flex',
    'flex-row',
    'space-x-2',
    'transition-colors',
    'items-center',
    badge ? undefined : 'font-bold',
    'text-white',
    badge ? undefined : 'py-4',
    badge ? 'px-2' : 'px-6',
    'rounded',
    'focus:outline-none',
    buttonColor(color),
    loading ? 'cursor-not-allowed' : undefined
  )

const buttonColor = (color: ButtonColor) => {
  const { theme } = useSnapshot(AppStore)
  return classnames(
    color === 'accent'
      ? 'bg-accent'
      : color === 'primary'
      ? 'bg-primary'
      : color === 'success'
      ? 'bg-success'
      : 'bg-error',
    color === 'primary' && theme === 'dark' ? 'text-semi-background' : null,
    color === 'accent'
      ? 'hover:bg-accent-dimmed'
      : color === 'primary'
      ? 'hover:bg-secondary'
      : color === 'success'
      ? 'hover:opacity-90'
      : 'hover:bg-error-light'
  )
}

const Button: FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ color, children, loading, badge, ...rest }) => {
  return (
    <button
      className={button(color, loading, badge)}
      {...rest}
      disabled={loading}
    >
      {loading && <Loading small={badge} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default Button
