import {
  backgroundImage,
  classnames,
  gradientColorStops,
  height,
  zIndex,
} from 'classnames/tailwind'

const fade = (bottom = true) =>
  classnames(
    backgroundImage('bg-gradient-to-b'),
    gradientColorStops(
      bottom ? 'from-transparent' : 'from-primary-dark',
      bottom ? 'to-primary-dark' : 'to-transparent'
    ),
    height('h-3'),
    zIndex('z-10')
  )

export default function ({ bottom }: { bottom?: boolean }) {
  return <div className={fade(bottom || false)} />
}
