import { ERC721 } from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import LedgerRecord from 'models/LedgerRecord'
import SortedContracts from 'models/SortedContracts'
import TokenIdToOwnerMap from 'models/TokenIdToOwnerMap'
import filterContracts from 'helpers/filterContracts'
import getLedger, { getLedgerRecord } from 'helpers/ledger'
import getMapOfOwners from 'helpers/getMapOfOwners'
import sealCred from 'helpers/sealCred'

// TODO: listen to ledger's original and derivative contracts Transfer events and update originalContractsOwned and derivativeContractsOwned
// TODO: set up and destroy listeners on the ledger's original and derivative contracts on SetMerkleRoot (when adding a new contract) and DeleteMerkleRoot events

interface SealCredStoreType {
  ledger: Promise<Ledger>
  originalContracts?: Promise<SortedContracts<ERC721>>
  contractNames: { [contractAddress: string]: Promise<string | undefined> }
  derivativeContractsToOwnerMaps: {
    [contractAddress: string]: Promise<TokenIdToOwnerMap>
  }
  derivativeContractsToOwnerMapsLoading: {
    [contractAddress: string]: boolean
  }

  handleAccountChange: (account?: string) => Promise<void>
  refreshContractNames: (ledger: Ledger) => void
  refreshDerivativeContractsToOwnerMaps: (ledger: Ledger) => void
}

const SealCredStore = proxy<SealCredStoreType>({
  ledger: getLedger(sealCred).then((ledger) => {
    for (const record of Object.values(ledger)) {
      addListenersToLedgerRecord(record)
    }
    SealCredStore.refreshContractNames(ledger)
    SealCredStore.refreshDerivativeContractsToOwnerMaps(ledger)
    return ledger
  }),
  contractNames: {},
  derivativeContractsToOwnerMaps: {},
  derivativeContractsToOwnerMapsLoading: {}, // Used when Transfer events fire

  async handleAccountChange(account?: string) {
    if (!account) {
      SealCredStore.originalContracts = undefined
      return
    }
    const ledger = await SealCredStore.ledger
    const originalContracts = Object.values(ledger).map(
      (record) => record.originalContract
    )
    SealCredStore.originalContracts = filterContracts(
      originalContracts,
      account
    )
  },
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
    (from, to, tokenId) => {}
  )
  derivativeContract.on(
    originalContract.filters.Transfer(),
    (from, to, tokenId) => {}
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
