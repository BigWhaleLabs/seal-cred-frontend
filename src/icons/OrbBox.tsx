import Color from 'models/Color'
import classnames, {
  fill,
  opacity,
  transitionProperty,
} from 'classnames/tailwind'
import colorToDropShadow from 'helpers/colorToDropShadow'
import colorToStrokeColor from 'helpers/colorToStrokeColor'

const orbBoxStyles = (shadow?: boolean) =>
  classnames(
    opacity(shadow ? 'opacity-100' : 'opacity-90'),
    transitionProperty('transition-all')
  )
const fillPath = fill('fill-primary-dark')

interface OrbBoxProps {
  color: Color
  shadow?: boolean
}

export default function OrbBox({ color, shadow }: OrbBoxProps) {
  const shadowColor = colorToDropShadow(color)
  const strokeColor = colorToStrokeColor(color)

  return (
    <div style={{ height: '4.063rem', width: '4.063rem' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 66 66"
        className={classnames(shadowColor, orbBoxStyles(shadow))}
      >
        <path
          d="M3.77,11.72a8.67,8.67,0,0,1,8.66-8.67H60.1a8.68,8.68,0,0,1,8.67,8.67V59.38a8.68,8.68,0,0,1-8.67,8.67H12.43a8.67,8.67,0,0,1-8.66-8.67Z"
          transform="translate(-3.27 -2.55)"
          className={fillPath}
        />
        <path
          d="M3.77,11.72a8.67,8.67,0,0,1,8.66-8.67H60.1a8.68,8.68,0,0,1,8.67,8.67V59.38a8.68,8.68,0,0,1-8.67,8.67H12.43a8.67,8.67,0,0,1-8.66-8.67Z"
          transform="translate(-3.27 -2.55)"
          fill="none"
          className={strokeColor}
        />
        <path
          d="M63.35,8.47V58.3A4.33,4.33,0,0,1,59,62.63H36.27m-27.09,0V12.8a4.33,4.33,0,0,1,4.34-4.33H36.27"
          transform="translate(-3.27 -2.55)"
          fill="none"
          stroke={strokeColor}
          className={strokeColor}
        />
        <circle cx="33" cy="60.08" r="1.08" fill={strokeColor} />
        <circle cx="5.92" cy="60.08" r="1.08" fill={strokeColor} />
        <circle cx="33" cy="5.92" r="1.08" fill={strokeColor} />
        <circle cx="60.08" cy="5.92" r="1.08" fill={strokeColor} />
        <line
          x1="60.08"
          y1="29.21"
          x2="65.5"
          y2="29.21"
          fill="none"
          stroke={strokeColor}
          className={strokeColor}
        />
        <line
          x1="0.5"
          y1="29.21"
          x2="5.92"
          y2="29.21"
          fill="none"
          stroke={strokeColor}
          className={strokeColor}
        />
        <line
          x1="16.21"
          y1="0.5"
          x2="16.21"
          y2="5.92"
          fill="none"
          stroke={strokeColor}
          className={strokeColor}
        />
        <line
          x1="50.87"
          y1="60.08"
          x2="50.87"
          y2="65.5"
          fill="none"
          stroke={strokeColor}
          className={strokeColor}
        />
      </svg>
    </div>
  )
}
