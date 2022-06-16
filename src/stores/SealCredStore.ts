import { SCERC721Derivative } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxyWithComputed, subscribeKey } from 'valtio/utils'
import Ledger from 'models/Ledger'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import WalletStore from 'stores/WalletStore'
import getLedger from 'helpers/getLedger'
import getLedgerRecord from 'helpers/getLedgerRecord'
import getTokenIdToOwnerMap from 'helpers/getTokenIdToOwnerMap'
import isOwned from 'helpers/isOwned'
import sealCred from 'helpers/sealCred'

interface SealCredStoreType {
  ledger: Promise<Ledger>
  derivativeContractsToIsOwnedMap: {
    [contractAddress: string]: Promise<boolean>
  }
  derivativeContractsToOwnersMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }
  fetchDerivativeContracts: (ledger: Ledger) => void
}

interface ComputedSealCredStoreType {
  reverseLedger: Ledger
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
    derivativeContractsToIsOwnedMap: {},
    derivativeContractsToOwnersMaps: {},
    fetchDerivativeContracts: (ledger: Ledger) => {
      if (!WalletStore.account) {
        SealCredStore.derivativeContractsToIsOwnedMap = {}
        return
      }
      const derivativeContracts = Object.values(ledger).map(
        ({ derivativeContract }) => derivativeContract
      )
      for (const derivativeContract of derivativeContracts) {
        SealCredStore.derivativeContractsToIsOwnedMap[
          derivativeContract.address
        ] = isOwned(derivativeContract, WalletStore.account)
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
  }
)

function addListenerToDerivativeContract(
  derivativeContract: SCERC721Derivative
) {
  derivativeContract.on(
    derivativeContract.filters.Transfer(),
    async (from, to, tokenId) => {
      if (from === WalletStore.account || to === WalletStore.account) {
        SealCredStore.derivativeContractsToIsOwnedMap[
          derivativeContract.address
        ] = isOwned(derivativeContract, WalletStore.account)
      }
      const ownerMap = await SealCredStore.derivativeContractsToOwnersMaps[
        derivativeContract.address
      ]
      ownerMap[Number(tokenId)] = to
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
      ledger[originalContract] = getLedgerRecord(
        originalContract,
        derivativeContract
      )
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
