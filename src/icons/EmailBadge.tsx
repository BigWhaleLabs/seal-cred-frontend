import classnames, {
  borderRadius,
  boxShadow,
  boxShadowColor,
  fill,
  height,
  stroke,
  strokeWidth,
  width,
} from 'classnames/tailwind'

const svgClasses = classnames(
  boxShadow('shadow-lg'),
  boxShadowColor('shadow-secondary'),
  borderRadius('rounded-full'),
  width('w-16'),
  height('h-16')
)
const circleClasses = classnames(
  stroke('stroke-secondary'),
  strokeWidth('stroke-2'),
  fill('fill-primary-dark')
)
const lineClasses = classnames(
  stroke('stroke-secondary'),
  strokeWidth('stroke-2')
)

export default function () {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClasses}
    >
      <circle cx="32" cy="32" r="31" className={circleClasses} />
      <path
        d="M53.4828 54V28.2414C53.4828 16.5101 43.9727 7 32.2414 7C20.5101 7 11 16.5101 11 28.2414L11 54"
        className={lineClasses}
      />
      <path
        d="M32.2407 32.6667C33.9515 32.6667 35.3384 32.8718 35.3384 30.9094C35.3384 28.9471 33.9515 27.3563 32.2407 27.3563C30.5299 27.3563 29.143 28.9471 29.143 30.9094C29.143 32.8718 30.5299 32.6667 32.2407 32.6667ZM32.2407 32.6667C32.2407 33.8468 32.2407 36.4724 32.2407 37.5345M32.2407 37.5345C32.2407 41.0748 36.666 41.0747 36.666 37.5345M32.2407 37.5345C32.2407 41.0748 27.8154 41.0748 27.8154 37.5346"
        className={lineClasses}
      />
      <path
        d="M29.0044 22.3254C29.0044 19.727 26.9548 17.6206 24.4265 17.6206C21.8982 17.6206 19.8486 19.727 19.8486 22.3254"
        className={lineClasses}
      />
      <path
        d="M44.937 22.3257C44.937 19.7273 42.8874 17.6209 40.3591 17.6209C37.8308 17.6209 35.7813 19.7273 35.7812 22.3257"
        className={lineClasses}
      />
      <path d="M46.4021 32.6665L41.0918 33.5516" className={lineClasses} />
      <path d="M41.092 36.207L46.4023 37.0921" className={lineClasses} />
      <path d="M18.0803 32.6665L23.3906 33.5516" className={lineClasses} />
      <path d="M23.3904 36.2068L18.0801 37.0918" className={lineClasses} />
      <path
        d="M27 47H37M27 47L32 53M27 47L24.5 53.5L11 48V41.5L27 47ZM37 47L32 53M37 47L39.5 53.5L53.5 48V41.5L37 47ZM32 53L27.5 57.5V62M32 53L36.5 57.5V62"
        className={lineClasses}
      />
    </svg>
  )
}
