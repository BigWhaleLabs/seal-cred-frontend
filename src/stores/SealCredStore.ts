import {
  ExternalSCERC721LedgerContract,
  SCERC721LedgerContract,
  SCEmailLedgerContract,
} from 'helpers/contracts/sealCredContracts'
import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import ERC721Ledger from 'models/ERC721Ledger'
import EmailLedger from 'models/EmailLedger'
import getERC721Ledger from 'helpers/contracts/getERC721Ledger'
import getERC721LedgerRecord from 'helpers/contracts/getERC721LedgerRecord'
import getEmailLedger from 'helpers/contracts/getEmailLedger'
import getEmailLedgerRecord from 'helpers/contracts/getEmailLedgerRecord'
import getExternalSCERC721Ledger from 'helpers/contracts/getExternalSCERC721Ledger'

interface SealCredStoreType {
  externalERC721Ledger: Promise<ERC721Ledger>
  ERC721Ledger: Promise<ERC721Ledger>
  emailLedger: Promise<EmailLedger>
}

interface ComputedSealCredStoreType {
  derivativeContracts: string[]
  externalERC721derivativeContracts: string[]
  ERC721derivativeContracts: string[]
  emailDerivativeContracts: string[]
}

const state = proxy<SealCredStoreType>({
  externalERC721Ledger: getExternalSCERC721Ledger(
    ExternalSCERC721LedgerContract
  ),
  ERC721Ledger: getERC721Ledger(SCERC721LedgerContract),
  emailLedger: getEmailLedger(SCEmailLedgerContract),
})

const SealCredStore = derive<SealCredStoreType, ComputedSealCredStoreType>(
  {
    externalERC721derivativeContracts: (get) =>
      Object.values(get(state).externalERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    ERC721derivativeContracts: (get) =>
      Object.values(get(state).ERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    emailDerivativeContracts: (get) =>
      Object.values(get(state).emailLedger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    derivativeContracts: (get) => [
      ...Object.values(get(state).ERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
      ...Object.values(get(state).externalERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
      ...Object.values(get(state).emailLedger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    ],
  },
  { proxy: state }
)

SCERC721LedgerContract.on(
  SCERC721LedgerContract.filters.CreateDerivativeContract(),
  async (originalContract, derivativeContract) => {
    console.info(
      'CreateDerivativeContract event',
      originalContract,
      derivativeContract
    )
    const ledger = await SealCredStore.ERC721Ledger
    if (!ledger[originalContract]) {
      ledger[originalContract] = getERC721LedgerRecord(
        originalContract,
        derivativeContract
      )
      SealCredStore.ERC721Ledger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
SCERC721LedgerContract.on(
  SCERC721LedgerContract.filters.DeleteOriginalContract(),
  async (originalContract) => {
    console.info('DeleteOriginalContract event', originalContract)
    const ledger = await SealCredStore.ERC721Ledger
    delete ledger[originalContract]
  }
)

ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.CreateDerivativeContract(),
  async (originalContract, derivativeContract) => {
    console.info(
      'CreateDerivativeContract event (external)',
      originalContract,
      derivativeContract
    )
    const ledger = await SealCredStore.externalERC721Ledger
    if (!ledger[originalContract]) {
      ledger[originalContract] = getERC721LedgerRecord(
        originalContract,
        derivativeContract
      )
      SealCredStore.externalERC721Ledger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.DeleteOriginalContract(),
  async (originalContract) => {
    console.info('DeleteOriginalContract event (external)', originalContract)
    const ledger = await SealCredStore.externalERC721Ledger
    delete ledger[originalContract]
  }
)

SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.CreateDerivativeContract(),
  async (domain, derivativeContract) => {
    console.info('CreateDerivativeContract event', domain, derivativeContract)
    const ledger = await SealCredStore.emailLedger
    if (!ledger[domain]) {
      ledger[domain] = getEmailLedgerRecord(derivativeContract, domain)
      SealCredStore.emailLedger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.DeleteEmail(),
  async (domain) => {
    console.info('DeleteOriginalContract event', domain)
    const ledger = await SealCredStore.emailLedger
    delete ledger[domain]
  }
)

export default SealCredStore
