import { SCERC721Derivative } from '@big-whale-labs/seal-cred-ledger-contract'

export default interface EmailLedger {
  [domain: string]: {
    derivativeContract: SCERC721Derivative
  }
}
