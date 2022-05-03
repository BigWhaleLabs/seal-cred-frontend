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
  fontSize,
  fontWeight,
  opacity,
  outlineStyle,
  padding,
  space,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'
import Loading from 'icons/Loading'

type ButtonColors = 'primary' | 'secondary' | 'tertiary'

export interface ButtonProps {
  colors: ButtonColors
  loading?: boolean
  small?: boolean
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const button = (
  colors: ButtonColors,
  loading?: boolean,
  disabled?: boolean,
  small?: boolean
) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    transitionProperty('transition-colors'),
    textColor('text-blue-900'),
    fontSize(small ? 'text-sm' : 'text-lg'),
    padding(small ? 'py-2' : 'py-4', small ? 'px-4' : 'px-6'),
    borderRadius('rounded-full'),
    outlineStyle('focus:outline-none'),
    cursor(loading || disabled ? 'cursor-not-allowed' : undefined),
    backgroundColor('bg-green'),
    dropShadow(loading || disabled ? undefined : 'drop-shadow-green'),
    opacity(loading || disabled ? 'opacity-50' : undefined)
  )

const Button: FC<ButtonProperties> = ({
  colors,
  small,
  children,
  loading,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={button(colors, loading, disabled, small)}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default Button
