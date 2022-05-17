import { AccentText } from 'components/Text'
import DownArrows from 'components/DownArrows'
import classnames, {
  alignItems,
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
  outlineStyle('focus:outline-none')
)

export default function ScrollDownButton() {
  return (
    <div onClick={() => window.scrollTo(0, 600)} className={scrollButton}>
      <AccentText color="text-accent">How does this work?</AccentText>
      <DownArrows />
    </div>
  )
}
