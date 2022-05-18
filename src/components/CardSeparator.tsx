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

type Gradient =
  | 'secondary-to-transparent'
  | 'accent-to-secondary'
  | 'accent-to-transparent'
interface CardSeparatorProps {
  number: number
  gradient: Gradient
  vertical?: boolean
  customHeight?: THeight
}

function getTailwindClassnames(gradient: Gradient) {
  switch (gradient) {
    case 'secondary-to-transparent':
      return 'from-secondary'
    case 'accent-to-secondary':
      return { 'from-accent': true, 'to-secondary': true }
    case 'accent-to-transparent':
      return 'from-accent'
  }
}

const connectiveBlock = (vertical = true) =>
  classnames(
    display('flex'),
    justifyContent(vertical ? 'justify-center' : 'justify-start'),
    flexDirection(vertical ? 'flex-row' : 'flex-col'),
    space(vertical ? 'space-x-2' : 'space-y-2'),
    margin(vertical ? 'mx-auto' : 'mt-12')
  )

const connectiveLine = ({ gradient, vertical }: CardSeparatorProps) =>
  classnames(
    gradientColorStops(getTailwindClassnames(gradient)),
    backgroundImage('bg-gradient-to-b', 'lg:bg-gradient-to-r'),
    width(vertical ? 'w-px' : 'w-4'),
    height(vertical ? 'h-4' : 'h-px')
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
