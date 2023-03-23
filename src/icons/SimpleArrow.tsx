import { classnames, stroke, strokeWidth } from 'classnames/tailwind'

export default function () {
  const strokeStyles = classnames(
    stroke('stroke-formal-accent'),
    strokeWidth('stroke-2')
  )

  return (
    <svg
      height="12"
      viewBox="0 0 7 12"
      width="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={strokeStyles} d="M6 11L1 6L6 1" />
    </svg>
  )
}
