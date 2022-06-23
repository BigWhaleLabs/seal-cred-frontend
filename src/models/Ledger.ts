import { ERC721, SCERC721Derivative } from '@upacyxou/test-contract'

export default interface Ledger {
  [originalContract: string]: {
    originalContract: ERC721
    derivativeContract: SCERC721Derivative
  }
}
