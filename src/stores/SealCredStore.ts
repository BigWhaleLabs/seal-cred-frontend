import { ERC721LedgerContract, SCEmailLedgerContract } from 'helpers/sealCred'
import { proxyWithComputed } from 'valtio/utils'
import ERC721Ledger from 'models/ERC721Ledger'
import EmailLedger from 'models/EmailLedger'
import getERC721Ledger from 'helpers/getERC721Ledger'
import getEmailLedger from 'helpers/getEmailLedger'
import getLedgerRecord from 'helpers/getERC721LedgerRecord'

interface SealCredStoreType {
  ERC721Ledger: Promise<ERC721Ledger>
  emailLedger: Promise<EmailLedger>
}

interface ComputedSealCredStoreType {
  reverseErc721Ledger: ERC721Ledger
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
      ledger[originalContract] = getLedgerRecord(
        originalContract,
        derivativeContract
      )
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

export default SealCredStore
