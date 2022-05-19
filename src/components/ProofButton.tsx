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

const proofButtonGradient = classnames(
  textColor('text-transparent'),
  gradientColorStops('from-primary-light', 'via-tertiary', 'to-tertiary'),
  backgroundClip('bg-clip-text'),
  backgroundImage('bg-gradient-to-t')
)

const button = (disabled?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    space('space-x-2'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    transitionProperty('transition-colors'),
    fontFamily('font-primary'),
    outlineStyle('focus:outline-none'),
    cursor(disabled ? 'cursor-not-allowed' : undefined),
    opacity(disabled ? 'opacity-95' : undefined),
    lineHeight('leading-5'),
    proofButtonGradient
  )

export default function ({
  children,
  disabled,
  ...rest
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={button(disabled)} disabled={disabled} {...rest}>
      {typeof children === 'string' ? <>{children}</> : children}
    </button>
  )
}
