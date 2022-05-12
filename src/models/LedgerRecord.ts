import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'

export default interface LedgerRecord {
  merkleRoot: string
  originalContract: ERC721
  derivativeContract: SCERC721Derivative
}
