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
  position,
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const cardsContainer = classnames(
  display('flex'),
  flexDirection('flex-col', 'xl:flex-row'),
  alignItems('items-center', 'xl:items-stretch'),
  justifyContent('xl:justify-center'),
  margin('mx-4')
)

const proofHintContainer = classnames(
  position('xl:relative'),
  inset('xl:right-1/4')
)

export default function () {
  const { xl } = useBreakpoints()

  return (
    <div>
      <div className={cardsContainer}>
        <ProofsCard />
        <CardSeparator
          numberOfLines={3}
          gradient="accent-to-secondary"
          vertical={!xl}
        />
        <Badges />
      </div>
      <div className={proofHintContainer}>
        <div className={display('lg:hidden')}>
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
