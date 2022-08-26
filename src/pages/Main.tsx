import { displayFromLg, displayToLg } from 'helpers/visibilityClassnames'
import Badges from 'components/badges/Badges'
import CardSeparator from 'components/CardSeparator'
import ProofsCard from 'components/proofs/Card'
import ZkProofHint from 'components/ZkProofHint'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
} from 'classnames/tailwind'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)

export default function () {
  return (
    <div className={mainBlock}>
      <ProofsCard />
      <>
        <CardSeparator
          className={displayToLg}
          numberOfLines={3}
          gradient="accent-to-secondary"
          vertical
        />
        <CardSeparator
          className={displayFromLg}
          numberOfLines={3}
          gradient="accent-to-secondary"
        />
      </>
      <Badges />
      <div className={classnames(displayToLg, flexDirection('flex-col'))}>
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
