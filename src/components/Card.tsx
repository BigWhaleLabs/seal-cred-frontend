import { FC } from 'react'
import {
  alignContent,
  alignItems,
  alignSelf,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  boxShadowColor,
  classnames,
  height,
  justifyContent,
  maxWidth,
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
    borderColor(
      color === 'yellow'
        ? 'border-yellow'
        : color === 'green'
        ? 'border-green'
        : color === 'pink'
        ? 'border-pink'
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
    borderWidth('border-1'),
    cardColor(shadow ? color : undefined),
    padding('p-6'),
    space('space-y-4'),
    maxWidth('max-w-md'),
    height(
      proofing ? 'h-mobile-proofing-card' : 'h-mobile-badging-card',
      'lg:h-card'
    ),
    width('w-mobile-card', 'lg:w-card')
  )
}

const Card: FC<CardProps> = ({ color, shadow, proofing, children }) => {
  return (
    <div className={cardContainer(shadow, color, proofing)}>{children}</div>
  )
}

export default Card
