export default interface SCEmailLedger {
  [originalContract: string]: {
    originalContract: string
    derivativeContract: string
  }
}
