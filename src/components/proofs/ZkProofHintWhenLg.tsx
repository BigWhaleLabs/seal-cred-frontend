import { displayFrom } from 'helpers/visibilityClassnames'
import CardSeparator from 'components/ui/CardSeparator'
import ZkProofHint from 'components/proofs/ZkProofHint'
import classnames, { flexDirection } from 'classnames/tailwind'

const container = classnames(displayFrom('lg'), flexDirection('flex-col'))

export default function () {
  return (
    <div className={container}>
      <CardSeparator
        numberOfLines={1}
        gradient="accent-to-transparent"
        vertical
      />
      <ZkProofHint />
    </div>
  )
}
