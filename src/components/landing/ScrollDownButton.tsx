import { AccentText } from 'components/ui/Text'
import DownArrows from 'components/landing/DownArrows'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  margin,
  outlineStyle,
} from 'classnames/tailwind'

const scrollButton = classnames(
  margin('mb-0', 'mt-16'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  outlineStyle('focus:outline-none'),
  cursor('cursor-pointer')
)
const arrowBlock = margin('-mt-6')

export default function () {
  return (
    <div
      className={scrollButton}
      onClick={() => window.scroll({ behavior: 'smooth', top: 600 })}
    >
      <AccentText color="text-accent">How does this work?</AccentText>
      <div className={arrowBlock}>
        <DownArrows />
      </div>
    </div>
  )
}
