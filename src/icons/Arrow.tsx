import classnames, {
  animation,
  dropShadow,
  height,
  rotate,
  transitionDuration,
  width,
} from 'classnames/tailwind'

const arrowAnimation = (
  pulseDisabled?: boolean,
  openDisabled?: boolean,
  open?: boolean
) =>
  classnames(
    animation({ 'animate-pulse-horizontal': !pulseDisabled }),
    rotate({ 'rotate-180': !openDisabled && open }),
    transitionDuration('duration-300')
  )
const svgInnerWrapper = classnames(
  width('w-full'),
  height('h-auto'),
  dropShadow('drop-shadow-secondary')
)

interface ArrowProps {
  openDisabled?: boolean
  pulseDisabled?: boolean
  horizontal?: boolean
  open?: boolean
}

export default function ({
  pulseDisabled,
  horizontal,
  openDisabled,
  open,
}: ArrowProps) {
  // same id of <linearGradient> will break multiple usage of this icon
  const strokeId = Math.random().toString()

  return (
    <div className={svgInnerWrapper}>
      <svg
        viewBox={horizontal ? '0 0 14 14' : '0 0 14 7'}
        xmlns="http://www.w3.org/2000/svg"
        className={arrowAnimation(pulseDisabled, openDisabled, open)}
      >
        <path
          d="M10.75 1.25L6.25 5.75L1.75 1.25"
          stroke={`url(#${strokeId})`}
          stroke-width="2"
          transform={horizontal ? 'rotate(-90 7 7)' : undefined}
        />
        <defs>
          <linearGradient
            id={strokeId}
            x1="3.89285"
            y1="1.35547"
            x2="3.89285"
            y2="5.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FF7BED" />
            <stop offset="1" stop-color="#FED823" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
