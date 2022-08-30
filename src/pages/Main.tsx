import { displayTo } from 'helpers/visibilityClassnames'
import Badges from 'components/badges/Badges'
import CardSeparator from 'components/CardSeparator'
import ProofsCard from 'components/proofs/Card'
import ZkProofHint from 'components/ZkProofHint'
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
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)
const bottomZkHint = classnames(
  displayTo('lg'),
  width('w-full'),
  flexDirection('flex-col')
)

export default function () {
  const { lg } = useBreakpoints()

  return (
    <div className={mainBlock}>
      <ProofsCard />
      <CardSeparator
        numberOfLines={3}
        gradient="accent-to-secondary"
        vertical={!lg}
      />
      <Badges />
      <div className={bottomZkHint}>
        <CardSeparator
          numberOfLines={1}
          gradient="secondary-to-transparent"
          vertical
        />
        <ZkProofHint />
      </div>
    </div>
  )
}
