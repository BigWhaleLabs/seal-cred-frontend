export default interface SCEmailLedger {
  [domain: string]: {
    derivativeContract: string
    domain: string
  }
}
