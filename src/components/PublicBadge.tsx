import { BodyText } from 'components/Text'
import { FC } from 'react'
import {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import PublicBadge from 'models/PublicBadge'
import titleForToken from 'helpers/titleForToken'

const container = classnames(
  display('flex'),
  borderWidth('border'),
  borderColor('border-border'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  padding('py-2', 'px-4'),
  borderRadius('rounded')
)
const PublicBadgeComponent: FC<{ badge: PublicBadge }> = ({ badge }) => {
  return (
    <div className={container}>
      <BodyText>{titleForToken(badge)}</BodyText>
    </div>
  )
}

export default PublicBadgeComponent
