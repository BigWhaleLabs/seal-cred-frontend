import classnames, {
  borderRadius,
  boxShadow,
  boxShadowColor,
  fill,
  stroke,
} from 'classnames/tailwind'

const svgClasses = (accent?: boolean) =>
  classnames(
    borderRadius('rounded-3xl'),
    boxShadow('shadow-lg'),
    boxShadowColor(accent ? 'shadow-accent' : 'shadow-secondary')
  )
const circleClasses = (accent?: boolean) =>
  fill(accent ? 'fill-accent' : 'fill-secondary')
const pathClasses = (accent?: boolean) =>
  stroke(accent ? 'stroke-primary-dimmed' : 'stroke-primary-semi-dimmed')

export default function ({ accent }: { accent?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClasses(accent)}
    >
      <circle cx="9" cy="9" r="9" className={circleClasses(accent)} />
      <path
        d="M5 9L8 12L13 7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={pathClasses(accent)}
      />
    </svg>
  )
}
