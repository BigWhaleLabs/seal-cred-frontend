export default interface ERC721Ledger {
  [originalContract: string]: {
    originalContract: string
    derivativeContract: string
  }
}
