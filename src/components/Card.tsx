import { FC } from 'react'
import {
  backgroundColor,
  borderRadius,
  boxShadow,
  boxShadowColor,
  classnames,
  height,
  margin,
  maxHeight,
  outlineColor,
  outlineStyle,
  outlineWidth,
  padding,
  position,
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
    outlineWidth('outline-1'),
    outlineStyle('outline'),
    outlineColor(
      color === 'yellow'
        ? 'outline-yellow'
        : color === 'green'
        ? 'outline-green'
        : color === 'pink'
        ? 'outline-pink'
        : color === 'white'
        ? 'outline-white'
        : color === 'blue'
        ? 'outline-blue-500'
        : 'outline-blue-900'
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
      onlyWrap ? undefined : thin ? 'h-60' : 'lg:h-card'
    ),
    maxHeight('max-h-508')
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
