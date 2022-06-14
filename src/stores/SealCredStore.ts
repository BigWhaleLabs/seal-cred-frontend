import { proxyWithComputed } from 'valtio/utils'
import ContractNamesStore from 'stores/ContractNamesStore'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import getLedger, { getLedgerRecord } from 'helpers/getLedger'
import getMapOfOwners from 'helpers/getTokenIdToOwnerMap'
import sealCred from 'helpers/sealCred'

interface SealCredStoreType {
  ledger: Promise<Ledger>
  originalContractsToOwnersMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }
  derivativeContractsToOwnersMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }

  fetchContractNames: (ledger: Ledger) => void
  fetchContractsToOwnerMaps: (ledger: Ledger) => void
}

interface ComputedSealCredStoreType {
  derivativeLedger: Ledger
}

const SealCredStore = proxyWithComputed<
  SealCredStoreType,
  ComputedSealCredStoreType
>(
  {
    ledger: getLedger(sealCred).then((ledger) => {
      SealCredStore.fetchContractNames(ledger)
      SealCredStore.fetchContractsToOwnerMaps(ledger)
      for (const record of Object.values(ledger)) {
        addListenersToLedgerRecord(record)
      }
      return ledger
    }),
    originalContractsToOwnersMaps: {},
    derivativeContractsToOwnersMaps: {},

    fetchContractNames(ledger: Ledger) {
      for (const { originalContract, derivativeContract } of Object.values(
        ledger
      )) {
        ContractNamesStore.fetchContractName(originalContract.address)
        ContractNamesStore.fetchContractName(derivativeContract.address)
      }
    },
    fetchContractsToOwnerMaps(ledger: Ledger) {
      for (const { originalContract, derivativeContract } of Object.values(
        ledger
      )) {
        SealCredStore.originalContractsToOwnersMaps[originalContract.address] =
          getMapOfOwners(originalContract)
        SealCredStore.derivativeContractsToOwnersMaps[
          derivativeContract.address
        ] = getMapOfOwners(derivativeContract)
      }
    },
  },
  {
    derivativeLedger: (state) =>
      Object.values(state.ledger).reduce(
        (result, record) => ({
          ...result,
          [record.derivativeContract.address]: record,
        }),
        {}
      ),
  }
)

function addListenersToLedgerRecord({
  originalContract,
  derivativeContract,
}: LedgerRecord) {
  originalContract.on(
    originalContract.filters.Transfer(),
    async (_, to, tokenId) => {
      console.log('Transfer (original)', originalContract.address, to, tokenId)
      const originalContractToOwnerMap = await SealCredStore
        .originalContractsToOwnersMaps[originalContract.address]

      const newOriginalContractToOwnerMap = {
        ...originalContractToOwnerMap,
        [tokenId.toNumber()]: to,
      }

      SealCredStore.originalContractsToOwnersMaps[originalContract.address] =
        Promise.resolve(newOriginalContractToOwnerMap)
    }
  )
  derivativeContract.on(
    derivativeContract.filters.Transfer(),
    async (_, to, tokenId) => {
      console.log(
        'Transfer (derivative)',
        derivativeContract.address,
        to,
        tokenId
      )
      const derivativeContractToOwnerMap = await SealCredStore
        .derivativeContractsToOwnersMaps[derivativeContract.address]

      const newDerivativeContractToOwnerMap = {
        ...derivativeContractToOwnerMap,
        [tokenId.toNumber()]: to,
      }

      SealCredStore.derivativeContractsToOwnersMaps[
        derivativeContract.address
      ] = Promise.resolve(newDerivativeContractToOwnerMap)
    }
  )
}

sealCred.on(
  sealCred.filters.CreateDerivativeContract(),
  async (originalContract) => {
    const ledger = await SealCredStore.ledger
    if (!ledger[originalContract]) {
      const record = await getLedgerRecord(sealCred, originalContract)
      ledger[originalContract] = record
      addListenersToLedgerRecord(record)
    }
  }
)
sealCred.on(
  sealCred.filters.DeleteOriginalContract(),
  async (originalContract) => {
    const ledger = await SealCredStore.ledger
    ledger[originalContract]?.originalContract.removeAllListeners()
    ledger[originalContract]?.derivativeContract.removeAllListeners()
    delete ledger[originalContract]
  }
)

export default SealCredStore
