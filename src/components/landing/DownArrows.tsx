import Arrow from 'icons/Arrow'
import classnames, {
  animation,
  height,
  margin,
  transitionProperty,
  width,
} from 'classnames/tailwind'

const arrowsBox = classnames(
  transitionProperty('transition-all'),
  animation('animate-bounce'),
  margin('my-6', 'ml-1'),
  height('h-10'),
  width('w-6')
)

export default function () {
  return (
    <div className={arrowsBox}>
      <Arrow pulseDisabled />
      <Arrow pulseDisabled />
      <Arrow pulseDisabled />
    </div>
  )
}
