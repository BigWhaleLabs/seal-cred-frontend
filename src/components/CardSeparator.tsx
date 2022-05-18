import classnames, {
  THeight,
  backgroundImage,
  display,
  flexDirection,
  gradientColorStops,
  height,
  justifyContent,
  margin,
  space,
  width,
} from 'classnames/tailwind'

type FromColor = 'from-accent' | 'from-secondary'
type ToColor = 'to-secondary'
interface CardSeparatorProps {
  number: number
  from?: FromColor
  to?: ToColor
  vertical?: boolean
  customHeight?: THeight
}

const connectiveBlock = (vertical = true) =>
  classnames(
    display('flex'),
    justifyContent(vertical ? 'justify-center' : 'justify-start'),
    flexDirection(vertical ? 'flex-row' : 'flex-col'),
    space(vertical ? 'space-x-2' : 'space-y-2'),
    margin(vertical ? 'mx-auto' : 'mt-12')
  )

const connectiveLine = ({
  from,
  to,
  vertical,
  customHeight,
}: CardSeparatorProps) =>
  classnames(
    gradientColorStops(
      from ? from : 'from-transparent',
      to ? to : 'to-transparent'
    ),
    backgroundImage('bg-gradient-to-b', 'lg:bg-gradient-to-r'),
    width(vertical ? 'w-px' : 'w-4'),
    height(customHeight ? customHeight : vertical ? 'h-4' : 'h-px')
  )

export default function (props: CardSeparatorProps) {
  return (
    <div className={connectiveBlock(props.vertical)}>
      {[...Array(props.number).keys()].map((_, index) => (
        <div key={index} className={connectiveLine(props)}></div>
      ))}
    </div>
  )
}
