import { FC } from 'react'
import {
  alignItems,
  backgroundColor,
  borderRadius,
  classnames,
  cursor,
  display,
  flexDirection,
  fontWeight,
  opacity,
  outlineStyle,
  padding,
  space,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Loading from 'components/Loading'

export type ButtonColor = 'accent' | 'primary' | 'success' | 'error'

export interface ButtonProps {
  color: ButtonColor
  loading?: boolean
  badge?: boolean
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const button = (
  color: ButtonColor,
  loading?: boolean,
  disabled?: boolean,
  badge?: boolean
) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    transitionProperty('transition-colors'),
    alignItems('items-center'),
    fontWeight(badge ? undefined : 'font-bold'),
    textColor('text-white'),
    padding(badge ? undefined : 'py-4', badge ? 'px-2' : 'px-6'),
    borderRadius('rounded'),
    outlineStyle('focus:outline-none'),
    buttonColor(color, disabled),
    cursor(loading || disabled ? 'cursor-not-allowed' : undefined),
    opacity(loading || disabled ? 'opacity-75' : undefined)
  )

const buttonColor = (color: ButtonColor, disabled?: boolean) => {
  const { theme } = useSnapshot(AppStore)
  return classnames(
    color === 'accent'
      ? backgroundColor('bg-accent', 'hover:bg-accent-dimmed')
      : color === 'primary'
      ? backgroundColor('bg-primary', 'hover:bg-secondary')
      : color === 'success'
      ? classnames(
          backgroundColor('bg-success'),
          opacity(disabled ? 'hover:opacity-75' : 'hover:opacity-90')
        )
      : backgroundColor('bg-error', 'hover:bg-error-light'),
    textColor(
      color === 'primary' && theme === 'dark' ? 'text-semi-background' : null
    )
  )
}

const Button: FC<ButtonProperties> = ({
  color,
  children,
  loading,
  disabled,
  badge,
  ...rest
}) => {
  return (
    <button
      className={button(color, loading, disabled, badge)}
      {...rest}
      disabled={loading || disabled}
    >
      {loading && <Loading small={badge} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default Button
