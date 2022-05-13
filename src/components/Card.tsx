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
} from 'classnames/tailwind'
import ArcText from 'components/ArcText'

type Color = 'pink' | 'yellow' | 'green' | 'blue' | 'white'
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
      color === 'yellow'
        ? 'border-yellow'
        : color === 'green'
        ? 'border-green'
        : color === 'pink'
        ? 'border-pink'
        : color === 'white'
        ? 'border-white'
        : color === 'blue'
        ? 'border-blue-500'
        : 'border-blue-900'
    ),
    boxShadow('shadow-2xl'),
    boxShadowColor(
      color === 'yellow'
        ? 'shadow-yellow50'
        : color === 'green'
        ? 'shadow-green50'
        : color === 'pink'
        ? 'shadow-pink50'
        : color === 'white'
        ? 'shadow-white50'
        : color === 'blue'
        ? 'shadow-blue50'
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
    backgroundColor('bg-blue-900'),
    cardColor(shadow ? color : undefined),
    padding(small ? 'p-3.875' : 'p-6'),
    width(
      thin ? 'lg:w-thin-card' : 'w-mobile-card',
      thin ? undefined : 'sm:w-card'
    ),
    margin(thin ? undefined : 'mx-4', 'lg:mx-0'),
    height(
      onlyWrap ? undefined : thin ? 'h-60' : 'h-fit',
      onlyWrap ? undefined : thin ? undefined : 'lg:h-card'
    ),
    space('space-y-4'),
    maxHeight(onlyWrap ? undefined : 'max-h-508')
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
