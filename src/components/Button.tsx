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
  lineHeight,
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
  type: 'primary' | 'secondary' | 'tertiary',
  fullWidth?: boolean,
  center?: boolean,
  loading?: boolean,
  disabled?: boolean,
  small?: boolean
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
    fontSize(small ? 'text-sm' : 'text-lg'),
    lineHeight(small ? 'leading-5' : 'leading-7'),
    type !== 'tertiary'
      ? padding(
          small
            ? { 'py-2': true, 'px-4': true }
            : { 'py-4': true, 'px-6': true }
        )
      : undefined,
    space('space-x-2')
  )

const button = ({
  fullWidth,
  center,
  type,
  loading,
  disabled,
  small,
  gradientFont,
}: ButtonProps) =>
  classnames(
    commonClasses(type, fullWidth, center, loading, disabled, small),
    colorClasses({ type, loading, disabled, gradientFont })
  )

const colorClasses = ({ type, loading, disabled }: ButtonProps) =>
  classnames(
    type === 'primary'
      ? classnames(
          textColor('text-primary-dark'),
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
          backgroundImage('bg-gradient-to-r'),
          textColor('text-secondary'),
          gradientColorStops(
            'hover:from-accent-light-transparent',
            'hover:to-secondary-light-transparent',
            'active:from-accent-light-active-transparent',
            'active:to-secondary-light-active-transparent'
          )
        )
      : backgroundColor('bg-transparent')
  )

const textGradient = ({ loading, disabled }: ButtonProps) =>
  classnames(
    textColor(
      'text-transparent',
      loading || disabled ? undefined : 'active:text-accent'
    ),
    backgroundClip('bg-clip-text'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-secondary', 'to-accent')
  )

interface ButtonProps {
  fullWidth?: boolean
  center?: boolean
  type: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  loading?: boolean
  small?: boolean
  withArrow?: boolean
  gradientFont?: boolean
  loadingOverflow?: boolean
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
  gradientFont,
  loadingOverflow,
  ...rest
}: Omit<React.HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loadingOverflow || !loading

  return (
    <button
      className={button({
        fullWidth,
        center,
        type,
        loading,
        disabled,
        small,
      })}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {showContent && (
        <div className={space('space-x-2')}>
          {typeof children === 'string' && gradientFont ? (
            <span className={textGradient({ type, loading, disabled })}>
              {children}
            </span>
          ) : (
            children
          )}
          {withArrow && (
            <div className={width('w-4')}>
              <Arrow
                horizontal
                pulseDisabled={disabled || loading}
                openDisabled
              />
            </div>
          )}
        </div>
      )}
    </button>
  )
}
