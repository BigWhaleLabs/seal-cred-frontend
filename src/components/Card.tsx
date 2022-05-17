import { FC } from 'react'
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  classnames,
  height,
  margin,
  maxHeight,
  padding,
  position,
  space,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ArcText from 'components/ArcText'

type Color = 'secondary' | 'primary' | 'tertiary' | 'accent' | 'white'
interface CardProps {
  shadow?: boolean
  color?: Color
  onlyWrap?: boolean
  spinner?: string
  thin?: boolean
  small?: boolean
}

const cardColor = (color?: Color) => {
  return classnames(
    borderWidth('border-1'),
    borderColor(
      color === 'primary'
        ? 'border-primary'
        : color === 'tertiary'
        ? 'border-tertiary'
        : color === 'secondary'
        ? 'border-secondary'
        : color === 'white'
        ? 'border-white'
        : color === 'accent'
        ? 'border-accent'
        : 'border-accent-dark'
    ),
    boxShadow('shadow-2xl'),
    boxShadowColor(
      color === 'primary'
        ? 'shadow-primary-50'
        : color === 'tertiary'
        ? 'shadow-tertiary-50'
        : color === 'secondary'
        ? 'shadow-secondary-50'
        : color === 'white'
        ? 'shadow-white-50'
        : color === 'accent'
        ? 'shadow-accent-semi-transparent'
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
    backgroundColor('bg-accent-dark'),
    cardColor(shadow ? color : undefined),
    padding(small ? 'p-3.875' : 'p-6'),
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
    space('space-y-4'),
    maxHeight(onlyWrap ? undefined : 'max-h-508'),
    wordBreak('break-words'),
    zIndex('z-30')
  )
}

const Card: FC<CardProps> = ({
  color,
  shadow,
  onlyWrap,
  spinner,
  thin,
  children,
  small,
}) => {
  return (
    <div className={cardContainer(shadow, color, onlyWrap, thin, small)}>
      {!!spinner && (
        <div className="absolute md:-top-28 md:-right-28 -top-24 -right-4">
          <ArcText text={spinner} />
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
