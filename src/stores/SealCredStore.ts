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
  async (originalContract, derivativeContract) => {
    console.info('CreateDerivative event', originalContract, derivativeContract)
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
  SCERC721LedgerContract.filters.DeleteOriginal(),
  async (originalContract) => {
    console.info('DeleteOriginal event', originalContract)
    const ledger = await SealCredStore.ERC721Ledger
    delete ledger[originalContract]
  }
)

ExternalSCERC721LedgerContract.on(
  ExternalSCERC721LedgerContract.filters.CreateDerivative(),
  async (originalContract, derivativeContract) => {
    console.info(
      'CreateDerivative event (external)',
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
  ExternalSCERC721LedgerContract.filters.DeleteOriginal(),
  async (originalContract) => {
    console.info('DeleteOriginal event (external)', originalContract)
    const ledger = await SealCredStore.externalERC721Ledger
    delete ledger[originalContract]
  }
)

SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.CreateDerivative(),
  async (originalContract, derivativeContract) => {
    console.info('CreateDerivative event', originalContract, derivativeContract)
    const ledger = await SealCredStore.emailLedger
    if (!ledger[originalContract]) {
      ledger[originalContract] = getEmailLedgerRecord(
        originalContract,
        derivativeContract
      )
      SealCredStore.emailLedger = Promise.resolve({
        ...ledger,
      })
    }
  }
)

export default SealCredStore
