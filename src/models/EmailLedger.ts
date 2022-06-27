export default interface EmailLedger {
  [domain: string]: {
    derivativeContract: string
    domain: string
  }
}
