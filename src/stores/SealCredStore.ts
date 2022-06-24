import { ERC721LedgerContract, SCEmailLedgerContract } from 'helpers/sealCred'
import { proxyWithComputed } from 'valtio/utils'
import ERC721Ledger from 'models/ERC721Ledger'
import EmailLedger from 'models/EmailLedger'
import getERC721Ledger from 'helpers/getERC721Ledger'
import getERC721LedgerRecord from 'helpers/getERC721LedgerRecord'
import getEmailLedger from 'helpers/getEmailLedger'
import getEmailLedgerRecord from 'helpers/getEmailLedgerRecord'

interface SealCredStoreType {
  ERC721Ledger: Promise<ERC721Ledger>
  emailLedger: Promise<EmailLedger>
}

interface ComputedSealCredStoreType {
  reverseErc721Ledger: ERC721Ledger
  reverseEmailLedger: EmailLedger
  derivativeContracts: string[]
}

const SealCredStore = proxyWithComputed<
  SealCredStoreType,
  ComputedSealCredStoreType
>(
  {
    ERC721Ledger: getERC721Ledger(ERC721LedgerContract),
    emailLedger: getEmailLedger(SCEmailLedgerContract),
  },
  {
    reverseErc721Ledger: (state) =>
      Object.values(state.ERC721Ledger).reduce(
        (prev, { originalContract, derivativeContract }) => ({
          ...prev,
          [derivativeContract.address]: {
            originalContract,
            derivativeContract,
          },
        }),
        {}
      ),
    reverseEmailLedger: (state) =>
      Object.values(state.emailLedger).reduce(
        (prev, { derivativeContract }) => ({
          ...prev,
          [derivativeContract.address]: {
            derivativeContract,
          },
        }),
        {}
      ),
    derivativeContracts: (state) => [
      ...Object.values(state.ERC721Ledger).map(
        ({ derivativeContract }) => derivativeContract.address
      ),
      ...Object.values(state.emailLedger).map(
        ({ derivativeContract }) => derivativeContract.address
      ),
    ],
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
  async (email, derivativeContract) => {
    console.info('CreateDerivativeContract event', email, derivativeContract)
    const ledger = await SealCredStore.emailLedger
    if (!ledger[email]) {
      ledger[email] = getEmailLedgerRecord(derivativeContract)
      SealCredStore.emailLedger = Promise.resolve({
        ...ledger,
      })
    }
  }
)
SCEmailLedgerContract.on(
  SCEmailLedgerContract.filters.DeleteEmail(),
  async (email) => {
    console.info('DeleteOriginalContract event', email)
    const ledger = await SealCredStore.emailLedger
    delete ledger[email]
  }
)

export default SealCredStore
