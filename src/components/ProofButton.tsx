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

type ButtonColors = 'primary' | 'secondary' | 'tertiary'

export interface ButtonProps {
  color: ButtonColors
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const tertiaryGradient = classnames(
  gradientColorStops('from-primary-light', 'via-tertiary', 'to-tertiary'),
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
      color === 'tertiary'
        ? 'text-transparent'
        : color === 'secondary'
        ? `text-secondary`
        : `text-accent`
    ),
    color === 'tertiary' ? tertiaryGradient : undefined,
    fontFamily('font-primary'),
    outlineStyle('focus:outline-none'),
    cursor(disabled ? 'cursor-not-allowed' : undefined),
    opacity(disabled ? 'opacity-95' : undefined),
    lineHeight('leading-5')
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
