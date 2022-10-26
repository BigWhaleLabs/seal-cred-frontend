import {
  backgroundColor,
  borderRadius,
  classnames,
  stroke,
  strokeWidth,
  transitionDuration,
  transitionProperty,
} from 'classnames/tailwind'

export default function ({ inheritColor }: { inheritColor?: boolean }) {
  const strokeStyle = classnames(
    strokeWidth('stroke-2'),
    stroke(inheritColor ? 'stroke-current' : 'stroke-formal-accent')
  )

  return (
    <div
      className={classnames(
        borderRadius('rounded-full'),
        backgroundColor('hover:bg-primary-semi-dimmed'),
        transitionDuration('duration-200'),
        transitionProperty('transition-colors')
      )}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <line className={strokeStyle} x1="5" y1="5" x2="19.1" y2="18.6" />
        <line className={strokeStyle} x1="5" y1="18.6" x2="18.6" y2="5" />
      </svg>
    </div>
  )
}
