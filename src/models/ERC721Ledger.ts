import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

export default interface ERC721Ledger {
  [originalContract: string]: {
    originalContract: ERC721
    derivativeContract: SCERC721Derivative
  }
}
