import classnames, {
  borderRadius,
  dropShadow,
  fill,
  stroke,
} from 'classnames/tailwind'

const svgClasses = (accent?: boolean) =>
  classnames(
    borderRadius('rounded-full'),
    dropShadow(accent ? 'drop-shadow-accent' : 'drop-shadow-secondary')
  )
const circleClasses = (accent?: boolean) =>
  fill(accent ? 'fill-accent' : 'fill-secondary')
const pathClasses = (accent?: boolean) =>
  stroke(accent ? 'stroke-primary-dimmed' : 'stroke-primary-semi-dimmed')

export default function ({ accent }: { accent?: boolean }) {
  return (
    <svg
      className={svgClasses(accent)}
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={circleClasses(accent)} cx="9" cy="9" r="9" />
      <path
        className={pathClasses(accent)}
        d="M5 9L8 12L13 7"
        stroke-width="2"
      />
    </svg>
  )
}
