import { useSnapshot } from 'valtio'
import ProofStore from 'stores/ProofStore'

export default function () {
  const stores = useSnapshot(ProofStore)

  return {
    hasAnyProof: Object.values(stores).some(
      (store) => store.proofsCompleted.length > 0
    ),
  }
}
