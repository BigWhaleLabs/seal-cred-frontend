import { classnames, stroke, strokeWidth } from 'classnames/tailwind'

const strokeStyle = classnames(
  strokeWidth('stroke-2'),
  stroke('stroke-formal-accent')
)

export default function () {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <line
        className={strokeStyle}
        x1="5.41421"
        y1="5"
        x2="19.0588"
        y2="18.6446"
      />
      <line
        x1="4.94116"
        y1="18.6446"
        x2="18.5858"
        y2="5.00001"
        className={strokeStyle}
      />
    </svg>
  )
}
