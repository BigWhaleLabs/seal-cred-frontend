import {
  backgroundImage,
  classnames,
  gradientColorStops,
  height,
  inset,
  position,
} from 'classnames/tailwind'

const fade = (bottom = true) =>
  classnames(
    backgroundImage('bg-gradient-to-b'),
    gradientColorStops(
      bottom ? 'from-transparent' : 'from-blue-900',
      bottom ? 'to-blue-900' : 'to-transparent'
    ),
    position('sticky'),
    inset('inset-0'),
    height('h-6')
  )

export default function Fade({ bottom }: { bottom?: boolean }) {
  return <div className={fade(bottom || false)} />
}
