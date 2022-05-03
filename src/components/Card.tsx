import { FC } from 'react'
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  dropShadow,
  fontSize,
  margin,
  maxWidth,
  padding,
  space,
  textColor,
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
        ? 'border-yellow'
        : color === 'green'
        ? 'border-green'
        : color === 'pink'
        ? 'border-pink'
        : color === 'blue'
        ? 'border-blue-500'
        : 'border-blue-900'
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
    backgroundColor('bg-blue-900'),
    borderWidth('border-1'),
    cardColor(shadow ? color : undefined),
    padding('p-6'),
    space('space-y-4'),
    margin('mx-auto'),
    maxWidth('max-w-md')
  )
}

const cardTitle = classnames(textColor('text-yellow'), fontSize('text-sm'))
export const CardTitle: FC = ({ children }) => {
  return <p className={cardTitle}>{children}</p>
}

const cardDescription = classnames(fontSize('text-xl'))
export const CardDescription: FC = ({ children }) => {
  return <p className={cardDescription}>{children}</p>
}

const Card: FC<CardProps> = ({ color, shadow, children }) => {
  return <div className={cardContainer(shadow, color)}>{children}</div>
}

export default Card
