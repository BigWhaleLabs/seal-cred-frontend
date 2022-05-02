import { FC } from 'react'
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  dropShadow,
  padding,
  space,
} from 'classnames/tailwind'

interface CardProps {
  shadow?: boolean
}

const cardContainer = (shadow?: boolean) => {
  return classnames(
    borderRadius('rounded-2xl'),
    backgroundColor('bg-blue-100'),
    dropShadow(shadow ? 'drop-shadow-yellow' : undefined),
    borderWidth(shadow ? 'border-1' : undefined),
    borderColor(shadow ? 'border-accent-yellow' : undefined),
    padding('p-6'),
    space('space-y-4')
  )
}

const Card: FC<CardProps> = ({ shadow, children }) => {
  return <div className={cardContainer(shadow)}>{children}</div>
}

export default Card
