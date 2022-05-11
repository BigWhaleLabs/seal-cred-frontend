import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import getLedger, { getLedgerRecord } from 'helpers/ledger'
import getMapOfOwners from 'helpers/getTokenIdToOwnerMap'
import sealCred from 'helpers/sealCred'

interface SealCredStoreType {
  ledger: Promise<Ledger>
  contractNames: { [contractAddress: string]: Promise<string | undefined> }
  originalContractsToOwnerMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }
  derivativeContractsToOwnerMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }

  refreshContractNames: (ledger: Ledger) => void
  refreshDerivativeContractsToOwnerMaps: (ledger: Ledger) => void
  refreshOriginalContractsToOwnerMaps: (ledger: Ledger) => void
}

const SealCredStore = proxy<SealCredStoreType>({
  ledger: getLedger(sealCred).then((ledger) => {
    for (const record of Object.values(ledger)) {
      addListenersToLedgerRecord(record)
    }
    SealCredStore.refreshOriginalContractsToOwnerMaps(ledger)
    SealCredStore.refreshDerivativeContractsToOwnerMaps(ledger)
    return ledger
  }),
  contractNames: {},
  originalContractsToOwnerMaps: {},
  derivativeContractsToOwnerMaps: {},

  refreshContractNames(ledger: Ledger) {
    for (const { originalContract, derivativeContract } of Object.values(
      ledger
    )) {
      if (!SealCredStore.contractNames[originalContract.address]) {
        SealCredStore.contractNames[originalContract.address] =
          originalContract.name()
      }
      if (!SealCredStore.contractNames[derivativeContract.address]) {
        SealCredStore.contractNames[derivativeContract.address] =
          derivativeContract.name()
      }
    }
  },
  refreshOriginalContractsToOwnerMaps(ledger: Ledger) {
    SealCredStore.originalContractsToOwnerMaps = {}
    const originalContracts = Object.values(ledger).map(
      ({ originalContract }) => originalContract
    )
    for (const contract of originalContracts) {
      SealCredStore.originalContractsToOwnerMaps[contract.address] =
        getMapOfOwners(contract)
    }
  },
  refreshDerivativeContractsToOwnerMaps(ledger: Ledger) {
    SealCredStore.derivativeContractsToOwnerMaps = {}
    const derivativeContracts = Object.values(ledger).map(
      ({ derivativeContract }) => derivativeContract
    )
    for (const contract of derivativeContracts) {
      SealCredStore.derivativeContractsToOwnerMaps[contract.address] =
        getMapOfOwners(contract)
    }
  },
})

function addListenersToLedgerRecord({
  originalContract,
  derivativeContract,
}: LedgerRecord) {
  originalContract.on(
    originalContract.filters.Transfer(),
    async (_, to, tokenId) => {
      const originalContractToOwnerMap = await SealCredStore
        .originalContractsToOwnerMaps[originalContract.address]
      originalContractToOwnerMap[tokenId.toNumber()] = to
    }
  )
  derivativeContract.on(
    derivativeContract.filters.Transfer(),
    async (_, to, tokenId) => {
      const derivativeContractToOwnerMap = await SealCredStore
        .derivativeContractsToOwnerMaps[derivativeContract.address]
      derivativeContractToOwnerMap[tokenId.toNumber()] = to
    }
  )
}

sealCred.on(
  sealCred.filters.SetMerkleRoot(),
  async (tokenAddress, merkleRoot) => {
    const ledger = await SealCredStore.ledger
    if (!ledger[tokenAddress]) {
      const record = await getLedgerRecord(sealCred, tokenAddress, merkleRoot)
      ledger[tokenAddress] = record
      addListenersToLedgerRecord(record)
    } else {
      ledger[tokenAddress].merkleRoot = merkleRoot
    }
  }
)
sealCred.on(sealCred.filters.DeleteMerkleRoot(), async (tokenAddress) => {
  const ledger = await SealCredStore.ledger
  ledger[tokenAddress]?.originalContract.removeAllListeners()
  ledger[tokenAddress]?.derivativeContract.removeAllListeners()
  delete ledger[tokenAddress]
})

export default SealCredStore
