import { useSnapshot } from 'valtio'
import SealCredStore from 'stores/SealCredStore'

export default function () {
  const { externalERC721Ledger, ERC721Ledger, emailLedger } =
    useSnapshot(SealCredStore)

  return {
    externalERC721derivativeContracts: Object.values(externalERC721Ledger).map(
      ({ derivativeContract }) => derivativeContract
    ),
    ERC721derivativeContracts: Object.values(ERC721Ledger).map(
      ({ derivativeContract }) => derivativeContract
    ),
    emailDerivativeContracts: Object.values(emailLedger).map(
      ({ derivativeContract }) => derivativeContract
    ),
  }
}
