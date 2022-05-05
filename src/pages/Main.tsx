import Badges from 'components/Badges'
import CardSeparator from 'components/CardSeparator'
import ProofsCard from 'components/ProofsCard'
import ZkProofButton from 'components/ZkProofButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
} from 'classnames/tailwind'
import useWindowDimensions from 'helpers/useWindowDimensions'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)

function Main() {
  const { width } = useWindowDimensions()
  const mobile = width < 1024

  return (
    <>
      {/* <div className={proofingCardContainer}>
        <ProofingCard />
        <BadgingCard />
        <ZkProofButton />
      </div> */}
      <div className={mainBlock}>
        <ProofsCard />
        <CardSeparator number={3} from="yellow" to="pink" />
        <Badges />
      </div>
      {mobile && <ZkProofButton />}
    </>
  )
}

export default Main
