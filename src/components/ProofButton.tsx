import { FC } from 'react'
import {
  alignItems,
  classnames,
  cursor,
  display,
  dropShadow,
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  opacity,
  outlineStyle,
  space,
  textColor,
  transitionProperty,
} from 'classnames/tailwind'

type ButtonColors = 'yellow' | 'pink' | 'green'

export interface ButtonProps {
  color: ButtonColors
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const button = (color: ButtonColors, disabled?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    transitionProperty('transition-colors'),
    textColor(`text-${color}`),
    fontFamily('font-primary'),
    outlineStyle('focus:outline-none'),
    cursor(disabled ? 'cursor-not-allowed' : undefined),
    dropShadow(disabled ? undefined : 'drop-shadow-green'),
    opacity(disabled ? 'opacity-50' : undefined)
  )

const ProofButton: FC<ButtonProperties> = ({
  color,
  children,
  disabled,
  ...rest
}) => {
  return (
    <button className={button(color, disabled)} disabled={disabled} {...rest}>
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}

export default ProofButton
