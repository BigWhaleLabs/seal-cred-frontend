import { FC } from 'react'
import {
  backgroundColor,
  borderRadius,
  borderWidth,
  boxShadow,
  classnames,
  padding,
  space,
  transitionProperty,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'

interface CardProps {
  shadow?: boolean
}

const cardContainer = (shadow?: boolean) => {
  const { theme } = useSnapshot(AppStore)
  return classnames(
    transitionProperty('transition-colors'),
    borderRadius('rounded-block'),
    backgroundColor(theme === 'dark' ? 'bg-semi-background' : 'bg-background'),
    boxShadow(shadow ? 'shadow' : undefined),
    borderWidth(theme === 'light' ? 'border' : undefined),
    padding('p-6'),
    space('space-y-4')
  )
}

const Card: FC<CardProps> = ({ shadow, children }) => {
  return <div className={cardContainer(shadow)}>{children}</div>
}

export default Card
