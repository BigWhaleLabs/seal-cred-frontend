import { useSnapshot } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import SealCredStore from 'stores/SealCredStore'

export default function useDerivativeAddress(proof: BaseProof) {
  const { ledgers } = useSnapshot(SealCredStore)
  for (const ledger of Object.values(ledgers)) {
    if (ledger[proof.origin]) return ledger[proof.origin]
  }

  return null
}
