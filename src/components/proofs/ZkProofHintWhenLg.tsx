import { displayFromLg } from 'helpers/visibilityClassnames'
import CardSeparator from 'components/CardSeparator'
import ZkProofHint from 'components/ZkProofHint'
import classnames, { flexDirection } from 'classnames/tailwind'

export default function () {
  return (
    <div className={classnames(displayFromLg, flexDirection('flex-col'))}>
      <CardSeparator
        numberOfLines={1}
        gradient="accent-to-transparent"
        vertical
      />
      <ZkProofHint />
    </div>
  )
}
