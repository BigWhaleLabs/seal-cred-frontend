import { FC } from 'react'
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

type Color = 'pink' | 'yellow' | 'green' | 'blue' | 'transparent'

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
      from === 'blue'
        ? 'from-blue-500'
        : from === 'green'
        ? 'from-green'
        : from === 'yellow'
        ? 'from-yellow'
        : from === 'pink'
        ? 'from-pink'
        : 'from-transparent',
      to === 'blue'
        ? 'to-blue-500'
        : to === 'green'
        ? 'to-green'
        : to === 'yellow'
        ? 'to-yellow'
        : to === 'pink'
        ? 'to-pink'
        : 'to-transparent'
    ),
    backgroundImage('bg-gradient-to-b', 'lg:bg-gradient-to-r'),
    width(vertical ? 'w-px' : 'w-4'),
    height(customHeight ? `h-${customHeight}` : vertical ? 'h-4' : 'h-px')
  )

const CardSeparator: FC<{
  number: number
  from?: Color
  to?: Color
  vertical?: boolean
  customHeight?: number
}> = ({ to, from, number, vertical, customHeight }) => {
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

export default CardSeparator
