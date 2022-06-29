import classnames, {
  animation,
  dropShadow,
  height,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const arrowAnimation = (
  pulseDisabled?: boolean,
  openDisabled?: boolean,
  open?: boolean
) =>
  classnames(
    animation(
      pulseDisabled
        ? openDisabled
          ? undefined
          : open
          ? 'animate-rotate-180'
          : 'animate-rotate-0'
        : 'animate-pulse-horizontal'
    ),
    transitionProperty('transition-all')
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
  return (
    <div className={svgInnerWrapper}>
      <svg
        viewBox={horizontal ? '0 0 14 14' : '0 0 14 7'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={arrowAnimation(pulseDisabled, openDisabled, open)}
      >
        <path
          d="M10.75 1.25L6.25 5.75L1.75 1.25"
          stroke="url(#paint0_linear_90_6626)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform={horizontal ? 'rotate(-90 7 7)' : undefined}
        />
        <defs>
          <linearGradient
            id="paint0_linear_90_6626"
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
