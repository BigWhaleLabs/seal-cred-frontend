import { FC } from 'react'
import {
  alignItems,
  backgroundColor,
  borderRadius,
  classnames,
  cursor,
  display,
  dropShadow,
  flexDirection,
  fontWeight,
  opacity,
  outlineStyle,
  padding,
  space,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'
import Loading from 'icons/Loading'

export type ButtonColor = 'orange' | 'pink' | 'green' | 'yellow'

export interface ButtonProps {
  color: ButtonColor
  loading?: boolean
  small?: boolean
  glow?: boolean
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const button = (
  color: ButtonColor,
  loading?: boolean,
  disabled?: boolean,
  small?: boolean,
  glow?: boolean
) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    alignItems('items-center'),
    fontWeight(small ? undefined : 'font-bold'),
    transitionProperty('transition-colors'),
    textColor('text-white'),
    padding(small ? undefined : 'py-4', small ? 'px-2' : 'px-6'),
    borderRadius('rounded-full'),
    outlineStyle('focus:outline-none'),
    buttonColor(color, disabled),
    cursor(loading || disabled ? 'cursor-not-allowed' : undefined),
    opacity(loading || disabled ? 'opacity-75' : undefined),
    dropShadow(glow ? `drop-shadow-${color}` : undefined)
  )

const buttonColor = (color: ButtonColor, disabled?: boolean) => {
  return classnames(
    color === 'orange'
      ? backgroundColor('bg-orange', 'hover:bg-orange')
      : color === 'pink'
      ? backgroundColor('bg-pink', 'hover:bg-pink')
      : color === 'green'
      ? classnames(
          backgroundColor('bg-green'),
          opacity(disabled ? 'hover:opacity-75' : 'hover:opacity-90')
        )
      : backgroundColor('bg-pink', 'hover:bg-pink'),
    textColor('text-blue-900')
  )
}

const Button: FC<ButtonProperties> = ({
  color,
  children,
  loading,
  glow,
  disabled,
  small,
  ...rest
}) => {
  return (
    <button
      className={button(color, loading, disabled, small, glow)}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default Button
