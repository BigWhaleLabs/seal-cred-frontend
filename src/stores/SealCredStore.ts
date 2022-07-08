import {
  ERC721LedgerContract,
  MainnetERC721LedgerContract,
  SCEmailLedgerContract,
} from 'helpers/sealCred'
import { proxyWithComputed } from 'valtio/utils'
import ERC721Ledger from 'models/ERC721Ledger'
import EmailLedger from 'models/EmailLedger'
import getERC721Ledger from 'helpers/getERC721Ledger'
import getERC721LedgerRecord from 'helpers/getERC721LedgerRecord'
import getEmailLedger from 'helpers/getEmailLedger'
import getEmailLedgerRecord from 'helpers/getEmailLedgerRecord'

interface SealCredStoreType {
  MainnetERC721Ledger: Promise<ERC721Ledger>
  ERC721Ledger: Promise<ERC721Ledger>
  emailLedger: Promise<EmailLedger>
}

interface ComputedSealCredStoreType {
  derivativeContracts: string[]
  MainnetERC721derivativeContracts: string[]
  ERC721derivativeContracts: string[]
  emailDerivativeContracts: string[]
}

const SealCredStore = proxyWithComputed<
  SealCredStoreType,
  ComputedSealCredStoreType
>(
  {
    MainnetERC721Ledger: getERC721Ledger(MainnetERC721LedgerContract),
    ERC721Ledger: getERC721Ledger(ERC721LedgerContract),
    emailLedger: getEmailLedger(SCEmailLedgerContract),
  },
  {
    MainnetERC721derivativeContracts: (state) =>
      Object.values(state.MainnetERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    ERC721derivativeContracts: (state) =>
      Object.values(state.ERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    emailDerivativeContracts: (state) =>
      Object.values(state.emailLedger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    derivativeContracts: (state) => [
      ...Object.values(state.ERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract
      ),
      ...Object.values(state.emailLedger).map(
        ({ derivativeContract }) => derivativeContract
      ),
    ],
  }
)

MainnetERC721LedgerContract.on(
  MainnetERC721LedgerContract.filters.CreateDerivativeContract(),
  async (originalContract, derivativeContract) => {
    console.info(
      'CreateDerivativeContract event (mainnet)',
      originalContract,
      derivativeContract
    )
    const ledger = await SealCredStore.MainnetERC721Ledger
    if (!ledger[originalContract]) {
      ledger[originalContract] = getERC721LedgerRecord(
        originalContract,
        derivativeContract
      )
      SealCredStore.MainnetERC721Ledger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
MainnetERC721LedgerContract.on(
  MainnetERC721LedgerContract.filters.DeleteOriginalContract(),
  async (originalContract) => {
    console.info('DeleteOriginalContract event (mainnet)', originalContract)
    const ledger = await SealCredStore.MainnetERC721Ledger
    delete ledger[originalContract]
  }
)

ERC721LedgerContract.on(
  ERC721LedgerContract.filters.CreateDerivativeContract(),
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
ERC721LedgerContract.on(
  ERC721LedgerContract.filters.DeleteOriginalContract(),
  async (originalContract) => {
    console.info('DeleteOriginalContract event', originalContract)
    const ledger = await SealCredStore.ERC721Ledger
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
