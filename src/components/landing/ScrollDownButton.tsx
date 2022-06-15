import { AccentText } from 'components/Text'
import DownArrows from 'components/landing/DownArrows'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  margin,
  outlineStyle,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const scrollButton = (mobile?: boolean) =>
  classnames(
    margin(mobile ? 'mb-14' : undefined, mobile ? 'mt-3' : 'mt-16'),
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    outlineStyle('focus:outline-none'),
    cursor('cursor-pointer')
  )
const arrowBlock = (mobile?: boolean) =>
  classnames(margin(mobile ? '-mt-6' : undefined))

export default function () {
  const { xs } = useBreakpoints()
  return (
    <div
      onClick={() => window.scroll({ top: 600, behavior: 'smooth' })}
      className={scrollButton(xs)}
    >
      <AccentText color="text-accent">How does this work?</AccentText>
      <div className={arrowBlock(xs)}>
        <DownArrows />
      </div>
    </div>
  )
}
