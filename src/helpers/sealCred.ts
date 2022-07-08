import { goerliDefaultProvider } from 'helpers/defaultProvider'
import getSealCredERC721 from 'helpers/getSealCredERC721'
import getSealCredEmail from 'helpers/getSealCredEmail'

export const ERC721LedgerContract = getSealCredERC721(goerliDefaultProvider)
export const SCEmailLedgerContract = getSealCredEmail(goerliDefaultProvider)
