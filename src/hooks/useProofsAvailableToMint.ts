import { useSnapshot } from 'valtio'
import ContractsStore from 'stores/ContractsStore'
import ProofStore from 'stores/ProofStore'
import SealCredStore from 'stores/SealCredStore'
import workProofStore from 'stores/WorkProofStore'

export default function () {
  const { contractsOwned } = useSnapshot(ContractsStore)
  const { proofsCompleted: ERC721Proofs } = useSnapshot(ProofStore)
  const { proofsCompleted: WorkProofs } = useSnapshot(workProofStore)
  const { ledger } = useSnapshot(SealCredStore)

  // TODO
  return [...WorkProofs, ...ERC721Proofs]
}
