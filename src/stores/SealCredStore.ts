import { erc721Ledger, workLedger } from 'helpers/sealCred'
import { proxyWithComputed } from 'valtio/utils'
import EmailLedger from 'models/WorkLedger'
import Ledger from 'models/Ledger'
import getEmailLedger from 'helpers/getEmailLedger'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'

interface SealCredStoreType {
  erc721Ledger: Promise<Ledger>
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
    erc721Ledger: getLedger(erc721Ledger),
    workLedger: getEmailLedger(workLedger),
  },
  {
    reverseErc721Ledger: (state) =>
      Object.values(state.erc721Ledger).reduce(
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
      ...Object.values(state.erc721Ledger).map(
        ({ derivativeContract }) => derivativeContract.address
      ),
      ...Object.values(state.workLedger).map(
        ({ derivativeContract }) => derivativeContract.address
      ),
    ],
  }
)

erc721Ledger.on(
  erc721Ledger.filters.CreateDerivativeContract(),
  async (originalContract, derivativeContract) => {
    console.info(
      'CreateDerivativeContract event',
      originalContract,
      derivativeContract
    )
    const ledger = await SealCredStore.erc721Ledger
    if (!ledger[originalContract]) {
      ledger[originalContract] = getLedgerRecord(
        originalContract,
        derivativeContract
      )
    }
  }
)
erc721Ledger.on(
  erc721Ledger.filters.DeleteOriginalContract(),
  async (originalContract) => {
    console.info('DeleteOriginalContract event', originalContract)
    const ledger = await SealCredStore.erc721Ledger
    delete ledger[originalContract]
  }
)

export default SealCredStore
