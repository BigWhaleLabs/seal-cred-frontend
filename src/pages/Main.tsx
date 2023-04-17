import Badges from 'components/badges/Badges'
import CardSeparator from 'components/ui/CardSeparator'
import ProofsCard from 'components/proofs/Card'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'tablet:flex-row'),
  alignItems('items-center', 'tablet:items-stretch'),
  justifyContent('tablet:justify-center')
)

export default function () {
  const { tablet } = useBreakpoints()

  return (
    <div className={mainBlock}>
      <ProofsCard />
      <CardSeparator
        gradient="accent-to-secondary"
        numberOfLines={3}
        vertical={!tablet}
      />
      <Badges />
    </div>
  )
}
