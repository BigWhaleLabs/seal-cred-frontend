import { BadgeText } from 'components/Text'
import { ReactNode } from 'react'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  lineHeight,
  padding,
  space,
} from 'classnames/tailwind'

interface BadgesHintCardProps {
  children?: ReactNode
  text?: ReactNode
}

export default function ({ text, children }: BadgesHintCardProps) {
  return (
    <div
      className={classnames(
        display('flex'),
        flexDirection('flex-col'),
        borderRadius('rounded-lg'),
        backgroundColor('bg-primary-background'),
        padding('px-4', 'py-4'),
        space('space-y-4'),
        lineHeight('leading-6')
      )}
    >
      <BadgeText>{text}</BadgeText>
      {children}
    </div>
  )
}
