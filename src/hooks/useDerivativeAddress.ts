import { useSnapshot } from 'valtio'
import BaseProof from 'helpers/BaseProof'
import ERC721Proof from 'helpers/ERC721Proof'
import EmailProof from 'helpers/EmailProof'
import SealCredStore from 'stores/SealCredStore'

export default function useDerivativeAddress(proof: BaseProof) {
  const { emailLedger, ERC721Ledger, externalERC721Ledger } =
    useSnapshot(SealCredStore)
  if (proof instanceof EmailProof && emailLedger[proof.domain]) {
    return emailLedger[proof.domain].derivativeContract
  }
  if (proof instanceof ERC721Proof && ERC721Ledger[proof.contract]) {
    return ERC721Ledger[proof.contract].derivativeContract
  }
  if (proof instanceof ERC721Proof && externalERC721Ledger[proof.contract]) {
    return externalERC721Ledger[proof.contract].derivativeContract
  }
}
