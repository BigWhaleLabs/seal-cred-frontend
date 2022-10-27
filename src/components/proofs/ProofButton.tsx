import { HTMLAttributes } from 'preact/compat'
import {
  alignItems,
  classnames,
  cursor,
  display,
  flexDirection,
  fontFamily,
  fontWeight,
  lineHeight,
  opacity,
  outlineStyle,
  space,
  transitionProperty,
} from 'classnames/tailwind'

const button = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  alignItems('items-center'),
  fontWeight('font-bold'),
  transitionProperty('transition-colors'),
  fontFamily('font-primary'),
  outlineStyle('focus:outline-none'),
  cursor('disabled:cursor-not-allowed'),
  opacity('disabled:opacity-95'),
  lineHeight('leading-5')
)

export default function ({
  children,
  disabled,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={button} disabled={disabled} {...rest}>
      {typeof children === 'string' ? <>{children}</> : children}
    </button>
  )
}
