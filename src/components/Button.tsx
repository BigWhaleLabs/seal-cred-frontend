import {
  alignItems,
  backgroundClip,
  backgroundColor,
  backgroundImage,
  borderRadius,
  boxShadow,
  boxShadowColor,
  brightness,
  classnames,
  cursor,
  display,
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  opacity,
  outlineStyle,
  padding,
  space,
  textColor,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  width,
} from 'classnames/tailwind'
import Arrow from 'icons/Arrow'
import Loading from 'icons/Loading'

interface ButtonProps {
  primary?: boolean
  disabled?: boolean
  loading?: boolean
  small?: boolean
  withArrow?: boolean
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const commonClasses = (loading?: boolean, disabled?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    transitionDuration('duration-100'),
    cursor(loading || disabled ? 'cursor-not-allowed' : undefined),
    outlineStyle('focus:outline-none'),
    opacity(loading || disabled ? 'opacity-50' : undefined),
    boxShadow('shadow-2xl', 'hover:shadow-lg', 'active:shadow-md'),
    width('w-fit'),
    space('space-x-2')
  )

const button = ({ primary, loading, disabled, small }: ButtonProps) =>
  classnames(
    commonClasses(loading, disabled),
    colorClasses({ primary, loading, disabled, small })
  )

const colorClasses = ({ primary, loading, disabled, small }: ButtonProps) =>
  classnames(
    primary
      ? classnames(
          textColor('text-primary-dark'),
          fontSize(small ? 'text-sm' : 'text-lg'),
          padding(small ? 'py-2' : 'py-4', small ? 'px-4' : 'px-6'),
          borderRadius('rounded-full'),
          backgroundColor('bg-tertiary'),
          boxShadowColor(
            'shadow-tertiary',
            'hover:shadow-tertiary',
            'active:shadow-tertiary'
          ),
          boxShadow('shadow-button'),
          brightness(
            loading || disabled ? undefined : 'hover:brightness-75',
            loading || disabled ? undefined : 'active:brightness-50'
          )
        )
      : classnames(
          textColor(
            'text-transparent',
            loading || disabled ? undefined : 'active:text-accent'
          ),
          backgroundClip('bg-clip-text'),
          backgroundImage('bg-gradient-to-r'),
          gradientColorStops('from-secondary', 'to-accent')
        )
  )

export default function ({
  small,
  withArrow,
  primary,
  loading,
  disabled,
  children,
  ...rest
}: ButtonProperties) {
  return (
    <button
      className={button({ primary, loading, disabled, small })}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
      {withArrow && <Arrow disabled={disabled || loading} />}
    </button>
  )
}
