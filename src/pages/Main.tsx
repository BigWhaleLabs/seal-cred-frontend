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
import useBreakpoints from 'hooks/useBreakpoints'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)

export default function () {
  const { lg } = useBreakpoints()

  return (
    <>
      <div className={mainBlock}>
        <ProofsCard />
        <CardSeparator
          number={3}
          from="from-accent"
          to="to-secondary"
          vertical={!lg}
        />
        <Badges />
        {!lg && (
          <>
            <CardSeparator number={1} from="from-secondary" vertical />
            <ZkProofButton />
          </>
        )}
      </div>
    </>
  )
}
