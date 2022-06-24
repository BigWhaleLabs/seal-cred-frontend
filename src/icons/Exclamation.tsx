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
      <circle
        cx="6.50004"
        cy="6.50016"
        r="5.41667"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={svgElementClasses}
      />
      <line
        x1="6.50004"
        y1="3.79167"
        x2="6.50004"
        y2="6.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={svgElementClasses}
      />
      <line
        x1="6.50004"
        y1="8.66667"
        x2="6.50004"
        y2="9.20833"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={svgElementClasses}
      />
    </svg>
  )
}
