import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'

export default function () {
  const { proofsCompleted } = useSnapshot(ProofStore)

  return proofsCompleted
}
