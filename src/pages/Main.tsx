import Badges from 'components/badges/Badges'
import CardSeparator from 'components/CardSeparator'
import Footer from 'components/Footer'
import ProofsCard from 'components/proofs/Card'
import ZkProofHint from 'components/ZkProofHint'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
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
            <ZkProofHint />
          </>
        )}
      </div>
    </>
  )
}
