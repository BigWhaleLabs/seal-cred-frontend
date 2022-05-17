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

const DownArrows = () => {
  return (
    <div className={arrowsBox}>
      <Arrow flip disabled />
      <Arrow flip disabled />
      <Arrow flip disabled />
    </div>
  )
}

export default DownArrows
