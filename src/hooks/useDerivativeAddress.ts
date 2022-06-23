import { useSnapshot } from 'valtio'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import Proof from 'models/Proof'
import SealCredStore from 'stores/SealCredStore'

export default function useDerivativeAddress(proof: Proof) {
  const { workLedger, ERC721Ledger } = useSnapshot(SealCredStore)
  if (proof instanceof EmailProof && workLedger[proof.domain]) {
    return workLedger[proof.domain].derivativeContract.address
  }
  if (proof instanceof ERC721Proof && ERC721Ledger[proof.contract]) {
    return ERC721Ledger[proof.contract].derivativeContract.address
  }
  return
}
