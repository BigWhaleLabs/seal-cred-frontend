import classnames, { stroke, strokeWidth, width } from 'classnames/tailwind'

const strokeStle = classnames(
  strokeWidth('stroke-2'),
  stroke('stroke-formal-accent')
)

const svgWrapper = classnames(width('w-6'))

export default function () {
  return (
    <div className={svgWrapper}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line
          className={strokeStle}
          x1="5.41421"
          y1="5"
          x2="19.0588"
          y2="18.6446"
          stroke-linecap="round"
        />
        <line
          x1="4.94116"
          y1="18.6446"
          x2="18.5858"
          y2="5.00001"
          className={strokeStle}
          stroke-linecap="round"
        />
      </svg>
    </div>
  )
}
