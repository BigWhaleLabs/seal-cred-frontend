import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const svgElementClasses = classnames(
  stroke('stroke-formal-accent'),
  strokeWidth('stroke-1')
)

export default function () {
  return (
    <svg
      height="13"
      viewBox="0 0 13 13"
      width="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={svgElementClasses} cx="6.5" cy="6.5" r="5.4" />
      <line className={svgElementClasses} x1="6.5" x2="6.5" y1="3.8" y2="6.5" />
      <line className={svgElementClasses} x1="6.5" x2="6.5" y1="8.6" y2="9.2" />
    </svg>
  )
}
