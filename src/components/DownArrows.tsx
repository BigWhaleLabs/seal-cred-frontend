import Arrow from 'components/Arrow'
import CardSeparator from 'components/CardSeparator'

const DownArrows = () => {
  return (
    <div>
      <div className="transition-all animate-bounce -space-y-4 my-10">
        <Arrow flip disabled />
        <Arrow flip disabled />
        <Arrow flip disabled />
      </div>
      <CardSeparator number={1} from="yellow" vertical customHeight={9} />
    </div>
  )
}

export default DownArrows
