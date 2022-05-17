import classnames, {
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

type Color = 'accent' | 'primary' | 'secondary' | 'tertiary' | 'transparent'

const connectiveBlock = (vertical = true) =>
  classnames(
    display('flex'),
    justifyContent(vertical ? 'justify-center' : 'justify-start'),
    flexDirection(vertical ? 'flex-row' : 'flex-col'),
    space(vertical ? 'space-x-2' : 'space-y-2'),
    margin(vertical ? 'mx-auto' : 'mt-12')
  )

const connectiveLine = (
  from?: Color,
  to?: Color,
  vertical = true,
  customHeight?: number
) =>
  classnames(
    gradientColorStops(
      from === 'accent'
        ? 'from-accent'
        : from === 'tertiary'
        ? 'from-tertiary'
        : from === 'primary'
        ? 'from-primary'
        : from === 'secondary'
        ? 'from-secondary'
        : 'from-transparent',
      to === 'accent'
        ? 'to-accent'
        : to === 'tertiary'
        ? 'to-tertiary'
        : to === 'primary'
        ? 'to-primary'
        : to === 'secondary'
        ? 'to-secondary'
        : 'to-transparent'
    ),
    backgroundImage('bg-gradient-to-b', 'lg:bg-gradient-to-r'),
    width(vertical ? 'w-px' : 'w-4'),
    height(customHeight ? `h-${customHeight}` : vertical ? 'h-4' : 'h-px')
  )

interface CardSeparatorProps {
  number: number
  from?: Color
  to?: Color
  vertical?: boolean
  customHeight?: number
}

export default function ({
  to,
  from,
  number,
  vertical,
  customHeight,
}: CardSeparatorProps) {
  return (
    <div className={connectiveBlock(vertical)}>
      {[...Array(number).keys()].map((_, index) => (
        <div
          key={index}
          className={connectiveLine(from, to, vertical, customHeight)}
        ></div>
      ))}
    </div>
  )
}
