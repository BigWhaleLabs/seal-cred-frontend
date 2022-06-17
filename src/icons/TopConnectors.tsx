import { stroke } from 'classnames/tailwind'

const strokeTertiary = stroke('stroke-tertiary')
const strokeSecondary = stroke('stroke-secondary')

export default function () {
  return (
    <div style={{ width: '12.625rem', height: '26.25rem' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 202 700"
      >
        <line
          x1="10"
          y1="100"
          x2="10"
          y2="400"
          fill="none"
          className={strokeTertiary}
          stroke-linecap="round"
        />
        <line
          x1="192"
          y1="100"
          x2="192"
          y2="400"
          fill="none"
          className={strokeSecondary}
          stroke-linecap="round"
        />
        <line
          x1="101.5"
          x2="101.5"
          y1="0"
          y2="300"
          fill="none"
          stroke="url(#c)"
        />
      </svg>
    </div>
  )
}
