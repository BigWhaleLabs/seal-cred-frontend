import { stroke } from 'classnames/tailwind'

const strokeTertiary = stroke('stroke-tertiary')
const strokeSecondary = stroke('stroke-secondary')
const strokeAccent = stroke('stroke-accent')

export default function () {
  return (
    <div style={{ width: '12.625rem' }}>
      <svg
        viewBox="0 0 202 700"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <line className={strokeTertiary} x1="10" x2="10" y1="80" y2="240" />
        <line className={strokeSecondary} x1="192" x2="192" y1="80" y2="250" />
        <line className={strokeAccent} x1="102" x2="102" y1="0" y2="210" />
      </svg>
    </div>
  )
}
