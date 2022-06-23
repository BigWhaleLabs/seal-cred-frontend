import defaultProvider from 'helpers/defaultProvider'
import getSealCredERC721 from 'helpers/getSealCredERC721'
import getSealCredEmail from 'helpers/getSealCredEmail'

export const erc721Ledger = getSealCredERC721(defaultProvider)
export const workLedger = getSealCredEmail(defaultProvider)
