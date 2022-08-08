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
import getEmailLedger from 'helpers/contracts/getEmailLedger'
import getExternalSCERC721Ledger from 'helpers/contracts/getExternalSCERC721Ledger'
import getLedgerRecord from 'helpers/contracts/getLedgerRecord'

interface SealCredStoreType {
  externalERC721Ledger: Promise<ERC721Ledger>
  ERC721Ledger: Promise<ERC721Ledger>
  emailLedger: Promise<EmailLedger>
}

interface ComputedSealCredStoreType {
  derivativeContracts: Promise<string[]>
  externalERC721derivativeContracts: Promise<string[]>
  ERC721derivativeContracts: Promise<string[]>
  emailDerivativeContracts: Promise<string[]>
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
    externalERC721derivativeContracts: async (get) =>
      Object.values(await get(state).externalERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    ERC721derivativeContracts: async (get) =>
      Object.values(await get(state).ERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    emailDerivativeContracts: async (get) =>
      Object.values(await get(state).emailLedger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    derivativeContracts: async (get) => [
      ...Object.values(await get(state).ERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
      ...Object.values(await get(state).externalERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
      ...Object.values(await get(state).emailLedger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    ],
  },
  { proxy: state }
)

SCERC721LedgerContract.on(
  SCERC721LedgerContract.filters.CreateDerivative(),
  async (origin, derivative) => {
    console.info('CreateDerivative event', origin, derivative)
    const ledger = await SealCredStore.ERC721Ledger
    if (!ledger[origin]) {
      ledger[origin] = getLedgerRecord(origin, derivative)
      SealCredStore.ERC721Ledger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
SCERC721LedgerContract.on(
  SCERC721LedgerContract.filters.DeleteOriginal(),
  async (origin) => {
    console.info('DeleteOriginal event', origin)
    const ledger = await SealCredStore.ERC721Ledger
    delete ledger[origin]
  }
)

ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.CreateDerivative(),
  async (origin, derivative) => {
    console.info('CreateDerivative event (external)', origin, derivative)
    const ledger = await SealCredStore.externalERC721Ledger
    if (!ledger[origin]) {
      ledger[origin] = getLedgerRecord(origin, derivative)
      SealCredStore.externalERC721Ledger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.DeleteOriginal(),
  async (origin) => {
    console.info('DeleteOriginal event (external)', origin)
    const ledger = await SealCredStore.externalERC721Ledger
    delete ledger[origin]
  }
)

SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.CreateDerivative(),
  async (origin, derivative) => {
    console.info('CreateDerivative event', origin, derivative)
    const ledger = await SealCredStore.emailLedger
    if (!ledger[origin]) {
      ledger[origin] = getLedgerRecord(origin, derivative)
      SealCredStore.emailLedger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.DeleteOriginal(),
  async (origin) => {
    console.info('DeleteOriginal event (email)', origin)
    const ledger = await SealCredStore.emailLedger
    delete ledger[origin]
  }
)

export default SealCredStore
