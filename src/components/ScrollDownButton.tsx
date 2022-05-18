import { AccentText } from 'components/Text'
import DownArrows from 'components/DownArrows'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  margin,
  outlineStyle,
} from 'classnames/tailwind'

const scrollButton = classnames(
  margin('mt-16'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  outlineStyle('focus:outline-none'),
  cursor('cursor-pointer')
)

export default function () {
  return (
    <div
      onClick={() => window.scroll({ top: 600, behavior: 'smooth' })}
      className={scrollButton}
    >
      <AccentText color="text-accent">How does this work?</AccentText>
      <DownArrows />
    </div>
  )
}
