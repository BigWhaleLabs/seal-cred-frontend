import Badges from 'components/Badges'
import Card from 'components/Card'
import CardSeparator from 'components/CardSeparator'
import ProofsCard from 'components/ProofsCard'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
} from 'classnames/tailwind'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-stretch'),
  justifyContent('sm:justify-center')
)

function Main() {
  return (
    <>
      <div className={mainBlock}>
        <ProofsCard />
        <CardSeparator number={3} from="yellow" to="pink" />
        <Card shadow color="pink">
          <Badges />
        </Card>
      </div>
      <ZkProofButton />
    </>
  )
}

export default Main
