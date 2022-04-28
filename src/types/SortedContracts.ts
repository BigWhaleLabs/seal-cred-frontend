import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'

type SortedContracts<T extends SCERC721Derivative | ERC721> = {
  minted: T[]
  unminted: T[]
}

export default SortedContracts
