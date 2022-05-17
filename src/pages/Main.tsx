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
import useBreakpoints from 'helpers/useBreakpoints'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)

function Main() {
  const { lg } = useBreakpoints()

  return (
    <>
      <div className={mainBlock}>
        <ProofsCard />
        <CardSeparator
          number={3}
          from="primary"
          to="secondary"
          vertical={!lg}
        />
        <Badges />
        {!lg && (
          <>
            <CardSeparator number={1} from="secondary" vertical />
            <ZkProofButton />
          </>
        )}
      </div>
    </>
  )
}

export default Main
