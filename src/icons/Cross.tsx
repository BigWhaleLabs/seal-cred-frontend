import {
  backgroundColor,
  borderRadius,
  classnames,
  stroke,
  strokeWidth,
  transitionDuration,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const animationWrapper = (basicSize?: boolean) =>
  classnames(
    borderRadius('rounded-full'),
    backgroundColor('hover:bg-primary-semi-dimmed'),
    transitionDuration('duration-200'),
    transitionProperty('transition-colors'),
    width({ 'w-6': basicSize })
  )

export default function ({
  inheritColor,
  basicSize = true,
}: {
  inheritColor?: boolean
  basicSize?: boolean
}) {
  const strokeStyle = classnames(
    strokeWidth('stroke-2'),
    stroke(inheritColor ? 'stroke-current' : 'stroke-formal-accent')
  )

  return (
    <div className={animationWrapper(basicSize)}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <line className={strokeStyle} x1="5" y1="5" x2="19.1" y2="18.6" />
        <line className={strokeStyle} x1="5" y1="18.6" x2="18.6" y2="5" />
      </svg>
    </div>
  )
}
