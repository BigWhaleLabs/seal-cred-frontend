import {
  backgroundImage,
  classnames,
  gradientColorStops,
  height,
  inset,
  position,
  zIndex,
} from 'classnames/tailwind'

const fade = (bottom = true) =>
  classnames(
    backgroundImage('bg-gradient-to-b'),
    gradientColorStops(
      bottom ? 'from-transparent' : 'from-primary-dark',
      bottom ? 'to-primary-dark' : 'to-transparent'
    ),
    position('sticky'),
    inset(bottom ? '-bottom-2' : '-top-1', 'left-0', 'right-0'),
    height(bottom ? 'h-6' : 'h-4'),
    zIndex('z-10')
  )

export default function ({ bottom }: { bottom?: boolean }) {
  return <div className={fade(bottom || false)} />
}
