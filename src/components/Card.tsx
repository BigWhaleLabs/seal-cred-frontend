import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'

interface CardProps {
  shadow?: boolean
}

const cardContainer = (shadow?: boolean) => {
  const { theme } = useSnapshot(AppStore)
  return classnames(
    'transition-colors',
    'rounded-block',
    theme === 'dark' ? 'bg-semi-background' : 'bg-background',
    shadow ? 'shadow' : undefined,
    theme === 'light' ? 'border' : undefined,
    'p-6',
    'space-y-4'
  )
}

const Card: FC<CardProps> = ({ shadow, children }) => {
  return <div className={cardContainer(shadow)}>{children}</div>
}

export default Card
