import { ERC721Ledger, workLedger } from 'helpers/sealCred'
import { proxyWithComputed } from 'valtio/utils'
import EmailLedger from 'models/EmailLedger'
import Ledger from 'models/Ledger'
import getERC721Ledger from 'helpers/getERC721Ledger'
import getEmailLedger from 'helpers/getEmailLedger'
import getLedgerRecord from 'helpers/getERC721LedgerRecord'

interface SealCredStoreType {
  ERC721Ledger: Promise<Ledger>
  workLedger: Promise<EmailLedger>
}

interface ComputedSealCredStoreType {
  reverseErc721Ledger: Ledger
  derivativeContracts: string[]
}

const SealCredStore = proxyWithComputed<
  SealCredStoreType,
  ComputedSealCredStoreType
>(
  {
    ERC721Ledger: getERC721Ledger(ERC721Ledger),
    workLedger: getEmailLedger(workLedger),
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
      ...Object.values(state.workLedger).map(
        ({ derivativeContract }) => derivativeContract.address
      ),
    ],
  }
)

ERC721Ledger.on(
  ERC721Ledger.filters.CreateDerivativeContract(),
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
ERC721Ledger.on(
  ERC721Ledger.filters.DeleteOriginalContract(),
  async (originalContract) => {
    console.info('DeleteOriginalContract event', originalContract)
    const ledger = await SealCredStore.ERC721Ledger
    delete ledger[originalContract]
  }
)

export default SealCredStore
