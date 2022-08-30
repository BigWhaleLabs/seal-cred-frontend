import { displayTo } from 'helpers/visibilityClassnames'
import Badges from 'components/badges/Badges'
import CardSeparator from 'components/CardSeparator'
import ProofsCard from 'components/proofs/Card'
import ZkProofHint from 'components/ZkProofHint'
import ZkProofHintWhenLg from 'components/proofs/ZkProofHintWhenLg'
import classnames, {
  alignItems,
  display,
  flexDirection,
  inset,
  justifyContent,
  margin,
  maxWidth,
  position,
  width,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const cardsContainer = classnames(
  display('flex'),
  flexDirection('flex-col', 'tablet:flex-row'),
  alignItems('items-center', 'tablet:items-stretch'),
  justifyContent('tablet:justify-center'),
  margin('mx-4'),
  maxWidth('lg:max-w-app-content')
)

const proofHintContainer = classnames(
  position('tablet:relative'),
  inset('tablet:right-1/4')
)
const bottomZkHint = classnames(
  displayTo('lg'),
  width('w-full'),
  flexDirection('flex-col')
)

export default function () {
  const { tablet } = useBreakpoints()

  return (
    <div>
      <div className={cardsContainer}>
        <ProofsCard />
        <CardSeparator
          numberOfLines={3}
          gradient="accent-to-secondary"
          vertical={!tablet}
        />
        <Badges />
      </div>
      <div className={proofHintContainer}>
        <div className={bottomZkHint}>
          <CardSeparator
            numberOfLines={1}
            gradient="secondary-to-transparent"
            vertical
          />
          <ZkProofHint />
        </div>
        <ZkProofHintWhenLg />
      </div>
    </div>
  )
}
