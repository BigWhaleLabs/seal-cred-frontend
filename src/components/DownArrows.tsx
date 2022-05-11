import Arrow from 'components/Arrow'
import CardSeparator from 'components/CardSeparator'
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
  margin('my-10')
)

const DownArrows = () => {
  return (
    <div>
      <div className={arrowsWrapper}>
        <Arrow flip disabled />
        <Arrow flip disabled />
        <Arrow flip disabled />
      </div>
      <CardSeparator number={1} from="yellow" vertical customHeight={9} />
    </div>
  )
}

export default DownArrows
