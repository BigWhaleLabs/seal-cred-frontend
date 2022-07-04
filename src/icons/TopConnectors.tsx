import { stroke } from 'classnames/tailwind'

const strokeTertiary = stroke('stroke-tertiary')
const strokeSecondary = stroke('stroke-secondary')
const strokeAccent = stroke('stroke-accent')

export default function () {
  return (
    <div style={{ width: '12.625rem' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 202 700"
      >
        <line
          x1="10"
          y1="80"
          x2="10"
          y2="240"
          fill="none"
          className={strokeTertiary}
          stroke-linecap="round"
        />
        <line
          x1="192"
          y1="80"
          x2="192"
          y2="250"
          fill="none"
          className={strokeSecondary}
          stroke-linecap="round"
        />
        <line
          x1="102"
          x2="102"
          y1="0"
          y2="210"
          fill="none"
          className={strokeAccent}
        />
      </svg>
    </div>
  )
}
