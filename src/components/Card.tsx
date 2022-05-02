import { FC } from 'react'
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadowColor,
  classnames,
  dropShadow,
  padding,
  space,
} from 'classnames/tailwind'

type Color = 'pink' | 'yellow' | 'green' | 'blue'
interface CardProps {
  shadow?: boolean
  color?: Color
}

const cardColor = (color?: Color) => {
  return classnames(
    borderColor(
      color === 'yellow'
        ? 'border-accent-yellow'
        : color === 'green'
        ? 'border-accent-green'
        : color === 'pink'
        ? 'border-accent-pink'
        : color === 'blue'
        ? 'border-blue-500'
        : 'border-blue-100'
    ),
    dropShadow(
      color === 'yellow'
        ? 'drop-shadow-yellow'
        : color === 'green'
        ? 'drop-shadow-green'
        : color === 'pink'
        ? 'drop-shadow-pink'
        : color === 'blue'
        ? 'drop-shadow-blue'
        : undefined
    )
  )
}

const cardContainer = (shadow?: boolean, color?: Color) => {
  return classnames(
    borderRadius('rounded-2xl'),
    backgroundColor('bg-blue-100'),
    borderWidth('border-1'),
    cardColor(shadow ? color : undefined),
    padding('p-6'),
    space('space-y-4')
  )
}

const Card: FC<CardProps> = ({ color, shadow, children }) => {
  return <div className={cardContainer(shadow, color)}>{children}</div>
}

export default Card
