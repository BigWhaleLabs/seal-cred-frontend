import { useSnapshot } from 'valtio'
import CardTitle from 'components/CardTitle'
import ProofStore from 'stores/ProofStore'

export default function ({
  availableToProofList,
}: {
  availableToProofList: string[]
}) {
  const { proofsCompleted } = useSnapshot(ProofStore)

  const allGenerated =
    proofsCompleted.length > 0 && availableToProofList.length === 0

  return (
    <CardTitle
      title={allGenerated ? 'All proofed out' : 'Start proofing!'}
      subtitle={
        allGenerated
          ? 'You generated all available ZK proofs for this wallet'
          : 'Generate ZK proofs'
      }
    />
  )
}
