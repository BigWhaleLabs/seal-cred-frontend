import classnames, {
  borderRadius,
  boxShadow,
  boxShadowColor,
  fill,
  stroke,
} from 'classnames/tailwind'

type Color = 'accent' | 'secondary'

const svgClasses = (color?: Color) =>
  classnames(
    borderRadius('rounded-3xl'),
    boxShadow('shadow-lg'),
    boxShadowColor(color === 'accent' ? 'shadow-accent' : 'shadow-secondary')
  )
const circleClasses = (color?: Color) =>
  classnames(fill(color === 'accent' ? 'fill-accent' : 'fill-secondary'))
const pathClasses = (color?: Color) =>
  classnames(
    stroke(
      color === 'accent'
        ? 'stroke-primary-dimmed'
        : 'stroke-primary-semi-dimmed'
    )
  )

interface CompleteProps {
  color: Color
}

export default function ({ color }: CompleteProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClasses(color)}
    >
      <circle cx="9" cy="9" r="9" className={circleClasses(color)} />
      <path
        d="M5 9L8 12L13 7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={pathClasses(color)}
      />
    </svg>
  )
}
