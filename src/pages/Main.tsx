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
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center'),
  margin('mx-4')
)

const mainContainer = classnames(width('w-full'), maxWidth('max-w-app-content'))

const proofHintContainer = classnames(
  position('lg:relative'),
  inset('lg:right-1/4')
)

export default function () {
  const { lg } = useBreakpoints()

  return (
    <div className={mainContainer}>
      <div className={cardsContainer}>
        <ProofsCard />
        <CardSeparator
          numberOfLines={3}
          gradient="accent-to-secondary"
          vertical={!lg}
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
