import { FC } from 'react'
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  classnames,
  padding,
  space,
  transitionProperty,
} from 'classnames/tailwind'
import AppStore from 'stores/AppStore'

interface CardProps {
  shadow?: boolean
}

const cardContainer = (shadow?: boolean) => {
  const { theme } = AppStore
  return classnames(
    transitionProperty('transition-colors'),
    borderRadius('rounded-block'),
    backgroundColor(theme === 'dark' ? 'bg-semi-background' : 'bg-background'),
    boxShadow(shadow ? 'shadow' : undefined),
    borderWidth('border'),
    borderColor(theme === 'dark' ? 'border-black' : 'border-gray-200'),
    padding('p-6'),
    space('space-y-4')
  )
}

const Card: FC<CardProps> = ({ shadow, children }) => {
  return <div className={cardContainer(shadow)}>{children}</div>
}

export default Card
