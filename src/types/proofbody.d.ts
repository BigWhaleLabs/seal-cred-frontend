export type ProofBody = {
  root: string | undefined
  leaf: string | undefined
  siblings: string[][] | undefined
  pathIndices: number[] | undefined
  r: string[] | undefined
  s: string[] | undefined
  msghash: string[] | undefined
  pubkey: string[][] | undefined
}
