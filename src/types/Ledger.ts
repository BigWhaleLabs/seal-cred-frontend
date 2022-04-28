import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'

type Ledger = {
  [key: string]: {
    merkleRoot: string
    originalContract: ERC721
    derivativeContract: SCERC721Derivative
  }
}

export default Ledger
