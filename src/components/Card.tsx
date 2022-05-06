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
  space,
  width,
} from 'classnames/tailwind'
import ArcText from 'components/ArcText'

type Color = 'pink' | 'yellow' | 'green' | 'blue'
interface CardProps {
  shadow?: boolean
  color?: Color
  onlyWrap?: boolean
  spinner?: string
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
        : color === 'blue'
        ? 'shadow-blue50'
        : undefined
    )
  )
}

const cardContainer = (shadow?: boolean, color?: Color, onlyWrap = false) => {
  return classnames(
    position('relative'),
    borderRadius('rounded-2xl'),
    backgroundColor('bg-blue-900'),
    cardColor(shadow ? color : undefined),
    padding('p-6'),
    space('space-y-4'),
    width('w-mobile-card', 'md:w-card'),
    margin('mx-4', 'lg:mx-0'),
    height(onlyWrap ? undefined : 'h-fit', onlyWrap ? undefined : 'lg:h-card'),
    maxHeight('max-h-508')
  )
}

const Card: FC<CardProps> = ({
  color,
  shadow,
  onlyWrap,
  spinner,
  children,
}) => {
  return (
    <div className={cardContainer(shadow, color, onlyWrap)}>
      {!!spinner && (
        // Can't use negative positioning in classnames()
        <div className="absolute md:-top-28 md:-right-28 -top-24 -right-4">
          <ArcText text={spinner} />
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
