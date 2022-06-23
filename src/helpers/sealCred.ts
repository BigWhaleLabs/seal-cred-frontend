import defaultProvider from 'helpers/defaultProvider'
import getSealCred from 'helpers/getSealCred'
import getSealCredWork from 'helpers/getSealCredWork'

export const erc721Ledger = getSealCred(defaultProvider)
export const workLedger = getSealCredWork(defaultProvider)
