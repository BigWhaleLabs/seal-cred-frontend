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

type Color = 'pink' | 'yellow' | 'green' | 'blue'

const connectiveBlock = classnames(
  display('flex'),
  justifyContent('justify-center', 'lg:justify-start'),
  flexDirection('flex-row', 'lg:flex-col'),
  space('space-x-2', 'lg:space-x-0', 'lg:space-y-2'),
  margin('mx-auto', 'mx-0', 'lg:mt-12')
)

const connectiveLine = (from?: Color, to?: Color) =>
  classnames(
    gradientColorStops(
      from === 'blue'
        ? 'from-blue-500'
        : from === 'green'
        ? 'from-green'
        : from === 'yellow'
        ? 'from-yellow'
        : 'from-pink',
      to === 'blue'
        ? 'to-blue-500'
        : to === 'green'
        ? 'to-green'
        : to === 'yellow'
        ? 'to-yellow'
        : 'to-pink'
    ),
    backgroundImage('bg-gradient-to-b', 'lg:bg-gradient-to-r'),
    width('w-px', 'lg:w-4'),
    height('h-4', 'lg:h-px')
  )

const CardSeparator: FC<{ number: number; from?: Color; to?: Color }> = ({
  to,
  from,
  number,
}) => {
  return (
    <div className={connectiveBlock}>
      {[...Array(number).keys()].map((_, index) => (
        <div key={index} className={connectiveLine(from, to)}></div>
      ))}
    </div>
  )
}

export default CardSeparator
