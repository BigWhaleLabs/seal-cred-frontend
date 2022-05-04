import { FC } from 'react'
import {
  backgroundColor,
  borderRadius,
  boxShadow,
  boxShadowColor,
  classnames,
  margin,
  maxHeight,
  maxWidth,
  minHeight,
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

const cardContainer = (shadow?: boolean, color?: Color) =>
  classnames(
    borderRadius('rounded-2xl'),
    backgroundColor('bg-blue-900'),
    cardColor(shadow ? color : undefined),
    padding('p-6'),
    space('space-y-4'),
    margin('mx-4', 'md:mx-0'),
    maxWidth('max-w-sm', 'md:max-w-md'),
    width('md:w-full'),
    minHeight('min-h-full'),
    maxHeight('max-h-508'),
    overflow('overflow-auto')
  )

const Card: FC<CardProps> = ({ color, shadow, children }) => {
  return <div className={cardContainer(shadow, color)}>{children}</div>
}

export default Card
