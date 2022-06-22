import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'
import Title from 'components/Title'
import useProofAddressesAvailableToCreate from 'hooks/useProofAddressesAvailableToCreate'

export default function () {
  const { proofsCompleted } = useSnapshot(ProofStore)
  const proofAddressesAvailableToCreate = useProofAddressesAvailableToCreate()

  const allGenerated =
    proofsCompleted.length > 0 && proofAddressesAvailableToCreate.length === 0

  return (
    <>
      <Title
        title={allGenerated ? 'All proofed out' : 'Start proofing!'}
        subtitle={
          allGenerated
            ? 'You generated all available ZK proofs for this wallet'
            : 'Generate ZK proofs'
        }
      />
    </>
  )
}
