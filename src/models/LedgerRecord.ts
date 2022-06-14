import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

export default interface LedgerRecord {
  originalContract: ERC721
  derivativeContract: SCERC721Derivative
}
