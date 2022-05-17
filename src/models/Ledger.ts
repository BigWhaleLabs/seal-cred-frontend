import LedgerRecord from 'models/LedgerRecord'

export default interface Ledger {
  [key: string]: LedgerRecord
}
