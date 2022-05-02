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
} from 'classnames/tailwind'
import Loading from 'icons/Loading'

export type ButtonColor = 'accent' | 'primary' | 'success' | 'error'

export interface ButtonProps {
  color: ButtonColor
  loading?: boolean
  small?: boolean
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const button = (
  color: ButtonColor,
  loading?: boolean,
  disabled?: boolean,
  small?: boolean
) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    alignItems('items-center'),
    fontWeight(small ? undefined : 'font-bold'),
    textColor('text-white'),
    padding(small ? undefined : 'py-4', small ? 'px-2' : 'px-6'),
    borderRadius('rounded'),
    outlineStyle('focus:outline-none'),
    buttonColor(color, disabled),
    cursor(loading || disabled ? 'cursor-not-allowed' : undefined),
    opacity(loading || disabled ? 'opacity-75' : undefined)
  )

const buttonColor = (color: ButtonColor, disabled?: boolean) => {
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
    textColor('text-primary')
  )
}

const Button: FC<ButtonProperties> = ({
  color,
  children,
  loading,
  disabled,
  small,
  ...rest
}) => {
  return (
    <button
      className={button(color, loading, disabled, small)}
      {...rest}
      disabled={loading || disabled}
    >
      {loading && <Loading small={small} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default Button
