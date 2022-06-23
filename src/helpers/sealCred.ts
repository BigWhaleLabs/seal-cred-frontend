import defaultProvider from 'helpers/defaultProvider'
import getSealCred from 'helpers/getSealCred'
import getSealCredEmail from 'helpers/getSealCredEmail'

export const erc721Ledger = getSealCred(defaultProvider)
export const workLedger = getSealCredEmail(defaultProvider)
