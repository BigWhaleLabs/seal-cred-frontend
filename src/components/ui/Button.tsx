import { HTMLAttributes } from 'preact/compat'
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

const commonClasses = (
  type: ButtonType,
  fullWidth?: boolean,
  center?: boolean,
  available?: boolean,
  small?: boolean,
  gradientFont?: boolean
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
      'active:shadow-button-active': available && !gradientFont,
      'hover:shadow-lg': available,
      'shadow-2xl': available,
    }),
    width(fullWidth ? 'w-full' : 'w-fit'),
    textAlign(center ? 'text-center' : undefined),
    fontSize(small ? 'text-sm' : 'text-lg'),
    lineHeight(small ? 'leading-5' : 'leading-7'),
    type !== 'tertiary'
      ? padding(
          small
            ? { 'px-4': true, 'py-2': true }
            : { 'px-6': true, 'py-4': true }
        )
      : undefined,
    space('space-x-2')
  )

const button = ({
  available,
  center,
  fullWidth,
  gradientFont,
  small,
  type,
}: ButtonProps & { available?: boolean }) =>
  classnames(
    commonClasses(type, fullWidth, center, available, small, gradientFont),
    colorClasses(type, available, gradientFont)
  )

const colorClasses = (
  type: ButtonType,
  available?: boolean,
  gradientFont?: boolean
) => {
  const hasNoGradient = !gradientFont

  return classnames(
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
            'active:brightness-90': available,
            'hover:brightness-95': available,
          })
        )
      : type === 'secondary'
      ? classnames(
          borderWidth('border'),
          borderRadius('rounded-full'),
          borderColor({
            'active:border-secondary': hasNoGradient,
            'border-secondary': hasNoGradient,
            'border-transparent': gradientFont,
            'hover:border-secondary': hasNoGradient,
          }),
          backgroundImage('bg-gradient-to-r'),
          textColor('text-secondary'),
          gradientColorStops({
            'active:from-accent-light-active-transparent': available,
            'active:to-secondary-light-active-transparent': available,
            'from-primary-dark': gradientFont,
            'hover:from-accent-light-transparent': available,
            'hover:to-secondary-light-transparent': available,
            'to-primary-dark': gradientFont,
          })
        )
      : backgroundColor('bg-transparent')
  )
}

const textGradient = (available?: boolean) =>
  classnames(
    textColor({
      'active:text-accent': available,
      'text-transparent': true,
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
  center,
  children,
  disabled,
  fullWidth,
  gradientFont,
  loading,
  loadingOverflow,
  small,
  type = 'tertiary',
  url,
  withArrow,
  ...rest
}: Omit<HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  const showContent = !loadingOverflow || !loading
  const available = !loading && !disabled

  return (
    <button
      disabled={!available}
      className={button({
        available,
        center,
        fullWidth,
        gradientFont,
        small,
        type,
      })}
      onClick={() => {
        if (url) window.open(url, '_blank')
      }}
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
            <Arrow
              horizontal
              openDisabled
              pulseDisabled={disabled || loading}
            />
          )}
        </>
      )}
    </button>
  )
}
