import { useSnapshot } from 'valtio'
import BaseProof from 'helpers/proofs/BaseProof'
import ERC721Proof from 'helpers/proofs/ERC721Proof'
import EmailProof from 'helpers/proofs/EmailProof'
import SealCredStore from 'stores/SealCredStore'

export default function useDerivativeAddress(proof: BaseProof) {
  const { ledgers } = useSnapshot(SealCredStore)
  const origin =
    proof instanceof EmailProof
      ? proof.domain
      : proof instanceof ERC721Proof
      ? proof.contract
      : ''

  for (const ledger of Object.values(ledgers)) {
    if (ledger[origin]) return ledger[origin]
  }

  return null
}
