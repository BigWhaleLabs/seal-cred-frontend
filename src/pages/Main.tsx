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
} from 'classnames/tailwind'
import useBreakpoints from 'hooks/useBreakpoints'

const cardsContainer = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-center', 'md:items-stretch'),
  justifyContent('md:justify-center'),
  margin('mx-4'),
  maxWidth('lg:max-w-app-content')
)

const proofHintContainer = classnames(
  position('md:relative'),
  inset('md:right-1/4')
)

export default function () {
  const { md } = useBreakpoints()

  return (
    <div>
      <div className={cardsContainer}>
        <ProofsCard />
        <CardSeparator
          numberOfLines={3}
          gradient="accent-to-secondary"
          vertical={!md}
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
