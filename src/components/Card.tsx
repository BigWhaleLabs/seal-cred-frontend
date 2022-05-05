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

const cardContainer = (shadow?: boolean, color?: Color) => {
  return classnames(
    borderRadius('rounded-2xl'),
    backgroundColor('bg-blue-900'),
    cardColor(shadow ? color : undefined),
    padding('p-6'),
    space('space-y-4'),
    width('w-mobile-card', 'lg:w-card'),
    margin('mx-4', 'lg:mx-0'),
    height('h-mobile-card', 'lg:h-card'),
    maxHeight('max-h-508'),
    overflow('overflow-auto')
  )
}

const Card: FC<CardProps> = ({ color, shadow, children }) => {
  return <div className={cardContainer(shadow, color)}>{children}</div>
}

export default Card
