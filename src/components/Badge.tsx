import { BadgeText } from 'components/Text'
import { FC } from 'react'
import { classnames } from 'classnames/tailwind'

const badge = classnames(
  'flex',
  'items-center',
  'justify-center',
  'rounded-2xl',
  'py-2',
  'px-4',
  'border-2',
  'max-w-xs',
  'border-border'
)

const Badge: FC = ({ children }) => {
  return (
    <div className={badge}>
      <BadgeText>{children}</BadgeText>
    </div>
  )
}

export default Badge
