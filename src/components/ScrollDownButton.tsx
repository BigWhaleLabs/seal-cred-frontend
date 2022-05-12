import { AccentText } from 'components/Text'
import DownArrows from 'components/DownArrows'
import classnames, {
  alignItems,
  display,
  flexDirection,
  margin,
} from 'classnames/tailwind'

const scrollButton = classnames(
  margin('mt-20'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

export default function ScrollDownButton() {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        window.scrollTo(0, 600)
      }}
      className={scrollButton}
    >
      <AccentText color="text-yellow">How does this work?</AccentText>
      <DownArrows />
    </button>
  )
}
