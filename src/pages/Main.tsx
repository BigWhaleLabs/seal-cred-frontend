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
          numberOfLines={3}
          gradient="accent-to-secondary"
          vertical={!lg}
        />
        <Badges />
        {!lg && (
          <>
            <CardSeparator
              numberOfLines={1}
              gradient="secondary-to-transparent"
              vertical
            />
            <ZkProofButton />
          </>
        )}
      </div>
    </>
  )
}
