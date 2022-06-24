import {
  alignItems,
  backgroundClip,
  backgroundColor,
  backgroundImage,
  borderColor,
  borderRadius,
  borderWidth,
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
  justifyContent,
  opacity,
  outlineStyle,
  padding,
  space,
  textAlign,
  textColor,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  width,
} from 'classnames/tailwind'
import Arrow from 'icons/Arrow'
import Loading from 'icons/Loading'
import React from 'react'

const commonClasses = (
  fullWidth?: boolean,
  center?: boolean,
  loading?: boolean,
  disabled?: boolean
) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent(center ? 'justify-center' : undefined),
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
    width(fullWidth ? 'w-full' : 'w-fit'),
    textAlign(center ? 'text-center' : undefined),
    space('space-x-2')
  )

const button = ({
  fullWidth,
  center,
  type,
  loading,
  disabled,
  small,
  fontSmall,
}: ButtonProps) =>
  classnames(
    commonClasses(fullWidth, center, loading, disabled),
    colorClasses({ type, loading, disabled, small, fontSmall })
  )

const colorClasses = ({
  type,
  loading,
  disabled,
  small,
  fontSmall,
}: ButtonProps) =>
  classnames(
    type === 'primary'
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
      : type === 'secondary'
      ? classnames(
          borderWidth('border'),
          borderRadius('rounded-full'),
          borderColor(
            'border-secondary',
            'hover:border-secondary',
            'active:border-secondary'
          ),
          padding(small ? 'py-2' : 'py-4', small ? 'px-4' : 'px-6'),
          backgroundImage('bg-gradient-to-r'),
          textColor('text-secondary'),
          gradientColorStops(
            'hover:from-accent-light-transparent',
            'hover:to-secondary-light-transparent',
            'active:from-accent-light-active-transparent',
            'active:to-secondary-light-active-transparent'
          ),
          fontSize(fontSmall ? 'text-sm' : undefined)
        )
      : classnames(
          textColor(
            'text-transparent',
            loading || disabled ? undefined : 'active:text-accent'
          ),
          backgroundClip('bg-clip-text'),
          backgroundImage('bg-gradient-to-r'),
          gradientColorStops('from-secondary', 'to-accent'),
          fontSize(fontSmall ? 'text-sm' : undefined)
        )
  )

interface ButtonProps {
  fullWidth?: boolean
  center?: boolean
  type: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  loading?: boolean
  small?: boolean
  withArrow?: boolean
  fontSmall?: boolean
}

export default function ({
  fullWidth,
  center,
  small,
  withArrow,
  type,
  loading,
  disabled,
  children,
  fontSmall,
  ...rest
}: Omit<React.HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  return (
    <button
      className={button({
        fullWidth,
        center,
        type,
        loading,
        disabled,
        small,
        fontSmall,
      })}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
      {withArrow && <Arrow disabled={disabled || loading} />}
    </button>
  )
}
