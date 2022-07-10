import { goerliDefaultProvider } from 'helpers/providers/defaultProvider'
import getExternalSCERC721LedgerContract from 'helpers/contracts/getExternalSCERC721LedgerContract'
import getSCERC721LedgerContract from 'helpers/contracts/getSCERC721LedgerContract'
import getSCEmailLedgerContract from 'helpers/contracts/getSCEmailLedgerContract'

export const ExternalSCERC721LedgerContract = getExternalSCERC721LedgerContract(
  goerliDefaultProvider
)
export const SCERC721LedgerContract = getSCERC721LedgerContract(
  goerliDefaultProvider
)
export const SCEmailLedgerContract = getSCEmailLedgerContract(
  goerliDefaultProvider
)
