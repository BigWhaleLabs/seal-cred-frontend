import { ReactNode } from 'react'
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  classnames,
  height,
  inset,
  margin,
  maxHeight,
  padding,
  position,
  space,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ArcText from 'icons/ArcText'

type Color = 'accent' | 'primary' | 'secondary' | 'tertiary' | 'formal-accent'
interface CardProps {
  children: ReactNode
  shadow?: boolean
  color?: Color
  onlyWrap?: boolean
  spinner?: string
  thin?: boolean
  small?: boolean
}

const cardColor = (color?: Color) => {
  return classnames(
    borderWidth('border'),
    borderColor(
      color === 'accent'
        ? 'border-accent'
        : color === 'tertiary'
        ? 'border-tertiary'
        : color === 'secondary'
        ? 'border-secondary'
        : color === 'formal-accent'
        ? 'border-formal-accent'
        : color === 'primary'
        ? 'border-primary'
        : 'border-primary-dark'
    ),
    boxShadow('shadow-2xl'),
    boxShadowColor(
      color === 'accent'
        ? 'shadow-accent-semi-transparent'
        : color === 'tertiary'
        ? 'shadow-tertiary-semi-transparent'
        : color === 'secondary'
        ? 'shadow-secondary-semi-transparent'
        : color === 'formal-accent'
        ? 'shadow-formal-accent-semi-transparent'
        : color === 'primary'
        ? 'shadow-primary-semi-transparent'
        : undefined
    )
  )
}

const cardContainer = (
  shadow?: boolean,
  color?: Color,
  onlyWrap = false,
  thin = false,
  small?: boolean
) => {
  return classnames(
    position('relative'),
    borderRadius('rounded-2xl'),
    backgroundColor('bg-primary-dark'),
    cardColor(shadow ? color : undefined),
    padding(small ? 'p-small' : 'p-6'),
    width(
      thin ? 'sm:!w-thin-card' : 'sm:w-card',
      thin ? 'tiny:w-thin-mobile' : 'w-mobile-card',
      thin ? 'w-32' : undefined
    ),
    margin(thin ? undefined : 'mx-4', 'lg:mx-0'),
    height(
      onlyWrap ? undefined : thin ? 'h-60' : 'h-fit',
      onlyWrap ? undefined : thin ? undefined : 'lg:h-card'
    ),
    space('space-y-6'),
    maxHeight(onlyWrap ? undefined : 'max-h-card'),
    wordBreak('break-words'),
    zIndex('z-30')
  )
}
const spinnerBox = classnames(
  position('absolute'),
  inset('-top-24', '-right-4', 'md:-top-28', 'md:-right-28')
)

export default function ({
  color,
  shadow,
  onlyWrap,
  spinner,
  thin,
  children,
  small,
}: CardProps) {
  return (
    <div className={cardContainer(shadow, color, onlyWrap, thin, small)}>
      {!!spinner && (
        <div className={spinnerBox}>
          <ArcText text={spinner} />
        </div>
      )}
      {children}
    </div>
  )
}
