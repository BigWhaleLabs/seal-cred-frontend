import Arrow from 'components/Arrow'
import classnames, {
  animation,
  margin,
  space,
  transitionProperty,
} from 'classnames/tailwind'

const arrowsWrapper = classnames(
  transitionProperty('transition-all'),
  animation('animate-bounce'),
  space('space-y-4'),
  margin('my-2')
)

const DownArrows = () => {
  return (
    <div className={arrowsWrapper}>
      <Arrow flip disabled />
      <Arrow flip disabled />
      <Arrow flip disabled />
    </div>
  )
}

export default DownArrows
