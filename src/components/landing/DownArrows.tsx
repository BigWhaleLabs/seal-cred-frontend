import Arrow from 'icons/Arrow'
import classnames, {
  animation,
  margin,
  space,
  transitionProperty,
} from 'classnames/tailwind'

const arrowsBox = classnames(
  transitionProperty('transition-all'),
  animation('animate-bounce'),
  space('-space-y-4'),
  margin('my-6')
)

export default function () {
  return (
    <div className={arrowsBox}>
      <Arrow turnDown pulseDisabled />
      <Arrow turnDown pulseDisabled />
      <Arrow turnDown pulseDisabled />
    </div>
  )
}
