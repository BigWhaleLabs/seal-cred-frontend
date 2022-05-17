import { BadgeText } from 'components/Text'
import { FC, ReactNode } from 'react'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  padding,
  space,
} from 'classnames/tailwind'

const BadgesHintCard: FC<{ text?: ReactNode }> = ({ text, children }) => {
  return (
    <div
      className={classnames(
        display('flex'),
        flexDirection('flex-col'),
        borderRadius('rounded-lg'),
        backgroundColor('bg-primary-background'),
        padding('px-4', 'py-4'),
        space('space-y-4')
      )}
    >
      <BadgeText>{text}</BadgeText>
      {children}
    </div>
  )
}

export default BadgesHintCard
