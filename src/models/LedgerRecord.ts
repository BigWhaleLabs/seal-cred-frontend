import { ERC721, SCERC721Derivative } from '@upacyxou/test-contract'

export default interface LedgerRecord {
  originalContract: ERC721
  derivativeContract: SCERC721Derivative
}
