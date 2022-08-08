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
  type: ButtonType,
  fullWidth?: boolean,
  center?: boolean,
  available?: boolean,
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
    cursor({ 'cursor-not-allowed': !available }),
    outlineStyle('focus:outline-none'),
    opacity({ 'opacity-50': !available }),
    boxShadow({
      'shadow-2xl': available,
      'hover:shadow-lg': available,
      'active:shadow-button-active': available,
    }),
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
  available,
  center,
  type,
  small,
}: ButtonProps & { available?: boolean }) =>
  classnames(
    commonClasses(type, fullWidth, center, available, small),
    colorClasses(type, available)
  )

const colorClasses = (type: ButtonType, available?: boolean) =>
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
          boxShadow({ 'shadow-button': available }),
          brightness({
            'hover:brightness-95': available,
            'active:brightness-90': available,
          })
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
          gradientColorStops({
            'hover:from-accent-light-transparent': available,
            'hover:to-secondary-light-transparent': available,
            'active:from-accent-light-active-transparent': available,
            'active:to-secondary-light-active-transparent': available,
          })
        )
      : backgroundColor('bg-transparent')
  )

const textGradient = (available?: boolean) =>
  classnames(
    textColor({
      'text-transparent': true,
      'active:text-accent': available,
    }),
    backgroundClip('bg-clip-text'),
    backgroundImage('bg-gradient-to-r'),
    gradientColorStops('from-secondary', 'to-accent')
  )

interface ButtonProps {
  fullWidth?: boolean
  center?: boolean
  type: ButtonType
  disabled?: boolean
  loading?: boolean
  small?: boolean
  withArrow?: boolean
  gradientFont?: boolean
  loadingOverflow?: boolean
  url?: string
}

type ButtonType = 'primary' | 'secondary' | 'tertiary'

export default function ({
  fullWidth,
  center,
  small,
  withArrow,
  type = 'tertiary',
  loading,
  disabled,
  children,
  gradientFont,
  loadingOverflow,
  url,
  ...rest
}: Omit<React.HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loadingOverflow || !loading
  const available = !loading && !disabled

  return (
    <button
      className={button({
        fullWidth,
        available,
        center,
        type,
        small,
      })}
      onClick={() => {
        if (url) window.open(url, '_blank')
      }}
      disabled={!available}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {showContent && (
        <>
          {gradientFont ? (
            <span className={textGradient(available)}>{children}</span>
          ) : (
            <div>{children}</div>
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
        </>
      )}
    </button>
  )
}
