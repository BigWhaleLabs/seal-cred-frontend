import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'

export type SortedContracts<T> = {
  minted: T[]
  unminted: T[]
}
export type SortedDerivatives = SortedContracts<SCERC721Derivative>
export type SortedOriginals = SortedContracts<ERC721>
