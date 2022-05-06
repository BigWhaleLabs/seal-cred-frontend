import Badges from 'components/Badges'
import CardSeparator from 'components/CardSeparator'
import ProofsCard from 'components/ProofsCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
} from 'classnames/tailwind'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)

function Main() {
  return (
    <>
      <div className={mainBlock}>
        <ProofsCard />
        <CardSeparator number={3} from="yellow" to="pink" />
        <Badges />
      </div>
    </>
  )
}

export default Main
