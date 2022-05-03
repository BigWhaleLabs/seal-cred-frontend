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

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'small'

export interface ButtonProps {
  design: ButtonType
  loading?: boolean
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const button = (design: ButtonType, loading?: boolean, disabled?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    transitionProperty('transition-colors'),
    textColor('text-blue-900'),
    fontSize(design === 'small' ? 'text-sm' : 'text-lg'),
    padding(
      design === 'small' ? 'py-2' : 'py-4',
      design === 'small' ? 'px-4' : 'px-6'
    ),
    borderRadius('rounded-full'),
    outlineStyle('focus:outline-none'),
    cursor(loading || disabled ? 'cursor-not-allowed' : undefined),
    backgroundColor('bg-green'),
    dropShadow(loading || disabled ? undefined : 'drop-shadow-green'),
    opacity(loading || disabled ? 'opacity-50' : undefined)
  )

const Button: FC<ButtonProperties> = ({
  design,
  children,
  loading,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={button(design, loading, disabled)}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Loading small={design === 'small'} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default Button
