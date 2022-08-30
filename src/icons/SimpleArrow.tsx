import { classnames, stroke, strokeWidth } from 'classnames/tailwind'

export default function () {
  const strokeStyles = classnames(
    stroke('stroke-formal-accent'),
    strokeWidth('stroke-2')
  )

  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 11L1 6L6 1" className={strokeStyles} />
    </svg>
  )
}
