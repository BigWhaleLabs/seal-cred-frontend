import { FC } from 'react'
import {
  alignItems,
  backgroundClip,
  backgroundImage,
  classnames,
  cursor,
  display,
  flexDirection,
  fontFamily,
  fontWeight,
  gradientColorStops,
  lineHeight,
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

const greenGradient = classnames(
  gradientColorStops('from-blue-400', 'via-green', 'to-green'),
  backgroundClip('bg-clip-text'),
  backgroundImage('bg-gradient-to-t')
)

const button = (color: ButtonColors, disabled?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    transitionProperty('transition-colors'),
    textColor(
      color === 'green'
        ? 'text-transparent'
        : color === 'pink'
        ? `text-pink`
        : `text-yellow`
    ),
    color === 'green' ? greenGradient : undefined,
    fontFamily('font-primary'),
    outlineStyle('focus:outline-none'),
    cursor(disabled ? 'cursor-not-allowed' : undefined),
    opacity(disabled ? 'opacity-50' : undefined),
    lineHeight('leading-leading-4')
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
