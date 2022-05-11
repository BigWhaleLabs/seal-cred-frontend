import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'
import proofStore from 'stores/ProofStore'

export default function useAvaliableProofs() {
  const { originalContracts } = useSnapshot(SealCredStore)
  const { proofsCompleted } = useSnapshot(proofStore)

  const completedProofsSet = proofsCompleted.reduce(
    (contracts, proof) => ({
      ...contracts,
      [proof.contract]: true,
    }),
    {} as {
      [address: string]: boolean
    }
  )

  return (
    originalContracts?.owned.filter(
      (contract) => !completedProofsSet[contract.address]
    ) || []
  )
}
