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

type Gradient =
  | 'secondary-to-transparent'
  | 'accent-to-secondary'
  | 'accent-to-transparent'

const getTailwindGradient = (gradient: Gradient) =>
  gradientColorStops(
    gradient === 'secondary-to-transparent'
      ? 'from-secondary'
      : gradient === 'accent-to-secondary'
      ? { 'from-accent': true, 'to-secondary': true }
      : gradient === 'accent-to-transparent'
      ? 'from-accent'
      : undefined
  )

const connectiveBlock = (vertical?: boolean) =>
  classnames(
    display('flex'),
    justifyContent(vertical ? 'justify-center' : 'justify-start'),
    flexDirection(vertical ? 'flex-row' : 'flex-col'),
    space(vertical ? 'space-x-2' : 'space-y-2'),
    margin(vertical ? 'mx-auto' : 'mt-12')
  )

interface CardSeparatorProps {
  numberOfLines: number
  gradient: Gradient
  vertical?: boolean
}

const connectiveLine = ({ gradient, vertical }: CardSeparatorProps) =>
  classnames(
    getTailwindGradient(gradient),
    backgroundImage('bg-gradient-to-b', 'lg:bg-gradient-to-r'),
    width(vertical ? 'w-px' : 'w-6'),
    height(vertical ? 'h-4' : 'h-px')
  )

export default function (props: CardSeparatorProps) {
  return (
    <div className={connectiveBlock(props.vertical)}>
      {Array(props.numberOfLines)
        .fill(null)
        .map((_, index) => (
          <div key={index} className={connectiveLine(props)}></div>
        ))}
    </div>
  )
}
