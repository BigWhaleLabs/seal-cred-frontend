import { FC } from 'react'
import { dropShadow, position } from 'classnames/tailwind'
import Colors from 'types/Colors'

const OrbBox: FC<{ color: Colors }> = ({ color }) => {
  const colorToDropShadow =
    color === Colors.pink
      ? 'drop-shadow-pink'
      : color === Colors.green
      ? 'drop-shadow-green'
      : 'drop-shadow-yellow'

  return (
    <div className={position('relative')}>
      <svg
        width="210"
        height="150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={dropShadow(colorToDropShadow)}>
          <path
            d="M75 83C75 78.5817 78.5817 75 83 75H127C131.418 75 135 78.5817 135 83V127C135 131.418 131.418 135 127 135H83C78.5817 135 75 131.418 75 127V83Z"
            fill="#0D0030"
          />
          <path
            d="M75 83C75 78.5817 78.5817 75 83 75H127C131.418 75 135 78.5817 135 83V127C135 131.418 131.418 135 127 135H83C78.5817 135 75 131.418 75 127V83Z"
            stroke={color}
          />
        </g>
        <path
          d="M130 80V105V126C130 128.209 128.209 130 126 130H105M80 130V105V84C80 81.7909 81.7909 80 84 80H105"
          stroke={color}
        />
        <circle cx="105" cy="130" r="1" fill={color} />
        <circle cx="80" cy="130" r="1" fill={color} />
        <circle cx="105" cy="80" r="1" fill={color} />
        <circle cx="130" cy="80" r="1" fill={color} />
        <line x1="130" y1="101.5" x2="135" y2="101.5" stroke={color} />
        <line x1="75" y1="101.5" x2="80" y2="101.5" stroke={color} />
        <line x1="89.5" y1="75" x2="89.5" y2="80" stroke={color} />
        <line x1="121.5" y1="130" x2="121.5" y2="135" stroke={color} />
      </svg>
    </div>
  )
}

export default OrbBox
