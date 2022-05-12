import { FC } from 'react'
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
import Arrow from 'components/Arrow'
import Loading from 'icons/Loading'

type ButtonColors = 'primary' | 'secondary' | 'tertiary'

export interface ButtonProps {
  colors: ButtonColors
  loading?: boolean
  small?: boolean
  arrow?: boolean
  fullWidth?: boolean
}

type ButtonColorClasses = {
  colors: ButtonColors
  small?: boolean
  loading?: boolean
  disabled?: boolean
}

interface ButtonClasses extends ButtonColorClasses {
  fullWidth?: boolean
}

type ButtonProperties = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const sharedClassNames = (
  fullWidth?: boolean,
  loading?: boolean,
  disabled?: boolean
) =>
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
    width(!fullWidth ? 'w-fit' : undefined)
  )

const button = ({
  colors,
  loading,
  disabled,
  small,
  fullWidth,
}: ButtonClasses) =>
  classnames(
    space('space-x-2'),
    sharedClassNames(fullWidth, loading, disabled),
    colorClasses({ colors, loading, disabled, small })
  )

const colorClasses = ({
  colors,
  loading,
  disabled,
  small,
}: ButtonColorClasses) =>
  classnames(
    colors === 'primary'
      ? classnames(
          textColor('text-blue-900'),
          fontSize(small ? 'text-sm' : 'text-lg'),
          padding(small ? 'py-2' : 'py-4', small ? 'px-4' : 'px-6'),
          borderRadius('rounded-full'),
          backgroundColor('bg-green'),
          boxShadowColor(
            'shadow-green50',
            'hover:shadow-green50',
            'active:shadow-green50'
          ),
          brightness(
            loading || disabled ? undefined : 'hover:brightness-75',
            loading || disabled ? undefined : 'active:brightness-50'
          )
        )
      : colors === 'secondary'
      ? classnames(textColor('text-yellow')) // TBD
      : classnames(
          textColor(
            'text-transparent',
            loading || disabled ? undefined : 'active:text-yellow'
          ),
          backgroundClip('bg-clip-text'),
          backgroundImage('bg-gradient-to-r'),
          gradientColorStops('from-pink', 'to-yellow')
        )
  )

const Button: FC<ButtonProperties> = ({
  colors,
  small,
  arrow,
  children,
  loading,
  disabled,
  ...rest
}) => (
  <button
    className={button({ colors, loading, disabled, small })}
    disabled={loading || disabled}
    {...rest}
  >
    {loading && <Loading small={small} />}
    {typeof children === 'string' ? (
      <span
        className={
          colors === 'tertiary'
            ? colorClasses({ colors, loading, disabled, small })
            : undefined
        }
      >
        {children}
      </span>
    ) : (
      children
    )}
    {arrow && <Arrow disabled={disabled || loading} />}
  </button>
)

export default Button
