import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import CardTitle from 'components/ui/CardTitle'
import ProofStore from 'stores/ProofStore'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

export function ListTitleSuspended() {
  const stores = useSnapshot(ProofStore)
  const avaliableToProof = useProofAddressesAvailableToCreate()

  const allGenerated =
    Object.values(stores).some((store) => store.proofsCompleted.length > 0) &&
    avaliableToProof.length === 0

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

export default function () {
  return (
    <Suspense
      fallback={
        <CardTitle
          title="Loading..."
          subtitle="Please, wait until I load supported NFTs, it takes time"
        />
      }
    >
      <ListTitleSuspended />
    </Suspense>
  )
}
