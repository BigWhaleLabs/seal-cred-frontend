export default interface ProofBody {
  root: string | undefined
  leaf: string | undefined
  siblings: string[][] | undefined
  pathIndices: number[] | undefined
  r: string[]
  s: string[]
  msghash: string[]
  pubkey: string[][]
}
