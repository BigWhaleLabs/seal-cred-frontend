import { classnames, stroke, strokeWidth } from 'classnames/tailwind'

const strokeStyle = classnames(
  strokeWidth('stroke-2'),
  stroke('stroke-formal-accent')
)

export default function () {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <line className={strokeStyle} x1="5.4" y1="5" x2="19.1" y2="18.6" />
      <line x1="5" y1="18.6" x2="18.6" y2="5" className={strokeStyle} />
    </svg>
  )
}
