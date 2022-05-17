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
    position('absolute'),
    inset(bottom ? 'bottom-0' : 'top-0', 'left-0', 'right-0'),
    height('h-3'),
    zIndex('z-10')
  )

export default function Fade({ bottom }: { bottom?: boolean }) {
  return <div className={fade(bottom || false)} />
}
