import { Suspense } from 'preact/compat'
import CardTitle from 'components/ui/CardTitle'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'
import useProofStore from 'hooks/useProofStore'

export function ListTitleSuspended() {
  const { hasAnyProof } = useProofStore()
  const avaliableToProof = useProofAddressesAvailableToCreate()

  const allGenerated = hasAnyProof && avaliableToProof.length === 0

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
