import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const svgElementClasses = classnames(
  stroke('stroke-formal-accent'),
  strokeWidth('stroke-1')
)

export default function () {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.5" cy="6.5" r="5.4" className={svgElementClasses} />
      <line x1="6.5" y1="3.8" x2="6.5" y2="6.5" className={svgElementClasses} />
      <line x1="6.5" y1="8.6" x2="6.5" y2="9.2" className={svgElementClasses} />
    </svg>
  )
}
