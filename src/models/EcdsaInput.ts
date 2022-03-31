export default interface EcdsaInput {
  r: string[] | undefined
  s: string[] | undefined
  msghash: string[] | undefined
  pubkey: string[][] | undefined
}
