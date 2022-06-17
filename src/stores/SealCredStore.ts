import { SCERC721Derivative } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxyWithComputed, subscribeKey } from 'valtio/utils'
import Ledger from 'models/Ledger'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import WalletStore from 'stores/WalletStore'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import getTokenIdToOwnerMap from 'helpers/getTokenIdToOwnerMap'
import sealCred from 'helpers/sealCred'

interface SealCredStoreType {
  ledger: Promise<Ledger>
  derivativeContractsToOwnersMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }
  fetchDerivativeContracts: (ledger: Ledger) => void
}

interface ComputedSealCredStoreType {
  reverseLedger: Ledger
  derivativeContracts: string[]
}

const SealCredStore = proxyWithComputed<
  SealCredStoreType,
  ComputedSealCredStoreType
>(
  {
    ledger: getLedger().then((ledger) => {
      SealCredStore.fetchDerivativeContracts(ledger)
      for (const { derivativeContract } of Object.values(ledger)) {
        addListenerToDerivativeContract(derivativeContract)
      }
      return ledger
    }),
    derivativeContractsToOwnersMaps: {},
    fetchDerivativeContracts: (ledger: Ledger) => {
      const derivativeContracts = Object.values(ledger).map(
        ({ derivativeContract }) => derivativeContract
      )

      for (const derivativeContract of derivativeContracts) {
        if (
          !SealCredStore.derivativeContractsToOwnersMaps[
            derivativeContract.address
          ]
        ) {
          SealCredStore.derivativeContractsToOwnersMaps[
            derivativeContract.address
          ] = getTokenIdToOwnerMap(derivativeContract)
        }
      }
    },
  },
  {
    reverseLedger: (state) =>
      Object.values(state.ledger).reduce(
        (prev, { originalContract, derivativeContract }) => ({
          ...prev,
          [derivativeContract.address]: {
            originalContract,
            derivativeContract,
          },
        }),
        {}
      ),
    derivativeContracts: (state) =>
      Object.values(state.ledger).map(
        ({ derivativeContract }) => derivativeContract.address
      ),
  }
)

function addListenerToDerivativeContract(
  derivativeContract: SCERC721Derivative
) {
  derivativeContract.on(
    derivativeContract.filters.Transfer(),
    async (from, to, tokenId) => {
      const ownerMap = await SealCredStore.derivativeContractsToOwnersMaps[
        derivativeContract.address
      ]
      if (ownerMap) {
        ownerMap[Number(tokenId)] = to
      }
    }
  )
}

sealCred.on(
  sealCred.filters.CreateDerivativeContract(),
  async (originalContract, derivativeContract) => {
    console.info(
      'CreateDerivativeContract event',
      originalContract,
      derivativeContract
    )
    const ledger = await SealCredStore.ledger
    if (!ledger[originalContract]) {
      const ledgerRecord = getLedgerRecord(originalContract, derivativeContract)
      ledger[originalContract] = ledgerRecord
      SealCredStore.derivativeContractsToOwnersMaps[
        ledgerRecord.derivativeContract.address
      ] = getTokenIdToOwnerMap(ledgerRecord.derivativeContract)
      addListenerToDerivativeContract(
        ledger[originalContract].derivativeContract
      )
    }
  }
)
sealCred.on(
  sealCred.filters.DeleteOriginalContract(),
  async (originalContract) => {
    console.info('DeleteOriginalContract event', originalContract)
    const ledger = await SealCredStore.ledger
    ledger[originalContract].derivativeContract.removeAllListeners()
    delete ledger[originalContract]
  }
)

subscribeKey(WalletStore, 'account', async () => {
  SealCredStore.fetchDerivativeContracts(await SealCredStore.ledger)
})

export default SealCredStore
