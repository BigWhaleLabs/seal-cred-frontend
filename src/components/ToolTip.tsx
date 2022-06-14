import { HighlightedText } from 'components/Text'
import classnames, {
  backgroundColor,
  borderRadius,
  height,
  inset,
  margin,
  opacity,
  padding,
  position,
  rotate,
  transformOrigin,
  transitionDuration,
  transitionProperty,
  translate,
  width,
  zIndex,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const tooltipClasses = (mobile: boolean, show: boolean) => {
  return classnames(
    position('absolute'),
    backgroundColor('bg-formal-accent'),
    inset(mobile ? 'left-0' : 'left-3', mobile ? 'right-0' : 'right-3'),
    inset('bottom-4'),
    padding('py-2', 'px-5'),
    margin('!ml-0'),
    zIndex('z-50'),
    borderRadius('!rounded-lg'),
    opacity(show ? 'opacity-100' : 'opacity-0'),
    transitionDuration('duration-500'),
    transitionProperty('transition-opacity')
  )
}
const triangle = classnames(
  position('absolute'),
  height('h-2'),
  width('w-2'),
  rotate('rotate-45'),
  translate('-translate-x-5.5'),
  inset('bottom-0', 'inset-x-1/2'),
  backgroundColor('bg-formal-accent'),
  transformOrigin('origin-bottom-left')
)

interface ToolTipProps {
  text: string
  show: boolean
}

export default function ({ text, show }: ToolTipProps) {
  const { xs } = useBreakpoints()

  return (
    <div
      className={tooltipClasses(xs, show)}
      style={{ visibility: show ? 'visible' : 'collapse' }}
    >
      <HighlightedText>{text}</HighlightedText>
      <div className={triangle}></div>
    </div>
  )
}
