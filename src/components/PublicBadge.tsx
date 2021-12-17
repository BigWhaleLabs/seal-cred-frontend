import { BodyText } from 'components/Text'
import { FC } from 'react'
import { classnames } from 'classnames/tailwind'
import PublicBadge from 'models/PublicBadge'
import titleForToken from 'helpers/titleForToken'

const container = classnames(
  'flex',
  'border',
  'border-border',
  'items-center',
  'justify-center',
  'py-2',
  'px-4',
  'rounded'
)
const PublicBadgeComponent: FC<{ badge: PublicBadge }> = ({ badge }) => {
  return (
    <div className={container}>
      <BodyText>{titleForToken(badge)}</BodyText>
    </div>
  )
}

export default PublicBadgeComponent
