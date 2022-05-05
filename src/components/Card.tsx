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
  maxWidth,
  minHeight,
  minWidth,
  outlineColor,
  outlineStyle,
  outlineWidth,
  overflow,
  padding,
  space,
  width,
} from 'classnames/tailwind'

type Color = 'pink' | 'yellow' | 'green' | 'blue'
interface CardProps {
  shadow?: boolean
  color?: Color
  proofing?: boolean
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

const cardContainer = (shadow?: boolean, color?: Color, proofing?: boolean) => {
  return classnames(
    borderRadius('rounded-2xl'),
    backgroundColor('bg-blue-900'),
    cardColor(shadow ? color : undefined),
    padding('p-6'),
    space('space-y-4'),
    width('w-mobile-card', 'lg:w-card'),
    margin('mx-4', 'sm:mx-0'),
    height(
      proofing ? 'h-mobile-proofing-card' : 'h-mobile-badging-card',
      'lg:h-card'
    ),
    minHeight('min-h-full'),
    maxHeight('max-h-508'),
    overflow('overflow-auto')
  )
}

const Card: FC<CardProps> = ({ color, shadow, proofing, children }) => {
  return (
    <div className={cardContainer(shadow, color, proofing)}>{children}</div>
  )
}

export default Card
