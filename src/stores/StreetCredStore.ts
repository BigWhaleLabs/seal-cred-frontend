import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import SortedContracts from 'models/SortedContracts'
import filterContracts from 'helpers/filterContracts'
import findByValue from 'helpers/findByValue'
import getLedger, { getLedgerRecord } from 'helpers/ledger'
import getMapOfOwners from 'helpers/getMapOfOwners'
import streetCred from 'helpers/streetCred'

// TODO: listen to ledger's original and derivative contracts Transfer events and update originalContractsOwned and derivativeContractsOwned
// TODO: set up and destroy listeners on the ledger's original and derivative contracts on SetMerkleRoot (when adding a new contract) and DeleteMerkleRoot events

interface StreetCredStoreType {
  ledger: Promise<Ledger>
  originalContracts?: Promise<SortedContracts<ERC721>>
  derivativeContracts?: Promise<SortedContracts<SCERC721Derivative>>
  contractNames: { [contractAddress: string]: Promise<string | undefined> }
  derivativeTokenIds: { [contractAddress: string]: number[] }

  handleAccountChange: (account?: string) => Promise<void>
  refreshContractNames: (ledger: Ledger) => void
  refreshDerivativeTokenIds: (account: string) => void
  refreshDerivativeContracts: (account: string) => Promise<void>
}

const StreetCredStore = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred).then((ledger) => {
    StreetCredStore.refreshContractNames(ledger)
    return ledger
  }),
  contractNames: {},
  derivativeTokenIds: {},

  async handleAccountChange(account?: string) {
    if (!account) {
      StreetCredStore.originalContracts = undefined
      StreetCredStore.derivativeContracts = undefined
      return
    }
    const ledger = await StreetCredStore.ledger
    const originalContracts = Object.values(ledger).map(
      (record) => record.originalContract
    )
    StreetCredStore.originalContracts = filterContracts(
      originalContracts,
      account
    )
    await StreetCredStore.refreshDerivativeContracts(account)
    StreetCredStore.refreshDerivativeTokenIds(account)
  },

  async refreshDerivativeTokenIds(account: string) {
    if (!account) StreetCredStore.derivativeTokenIds = {}
    const derivativeContracts = await StreetCredStore.derivativeContracts
    const ownedDerivativeContracts = derivativeContracts?.owned ?? []

    for (const contract of ownedDerivativeContracts) {
      const owners = await getMapOfOwners(contract)
      const tokenIds = findByValue<number, string>(owners, account)
      if (
        !!tokenIds.length &&
        !StreetCredStore.derivativeTokenIds[contract.address]
      ) {
        StreetCredStore.derivativeTokenIds[contract.address] = tokenIds
      }
    }
  },

  refreshContractNames(ledger: Ledger) {
    for (const { originalContract, derivativeContract } of Object.values(
      ledger
    )) {
      if (!StreetCredStore.contractNames[originalContract.address]) {
        StreetCredStore.contractNames[originalContract.address] =
          originalContract.name()
      }
      if (!StreetCredStore.contractNames[derivativeContract.address]) {
        StreetCredStore.contractNames[derivativeContract.address] =
          derivativeContract.name()
      }
    }
  },

  async refreshDerivativeContracts(account: string) {
    const derivativeContracts = Object.values(await StreetCredStore.ledger).map(
      (record) => record.derivativeContract
    )
    StreetCredStore.derivativeContracts = filterContracts(
      derivativeContracts,
      account
    )
  },
})

streetCred.on(
  streetCred.filters.SetMerkleRoot(),
  async (tokenAddress, merkleRoot) => {
    const ledger = await StreetCredStore.ledger
    if (!ledger[tokenAddress]) {
      ledger[tokenAddress] = await getLedgerRecord(
        streetCred,
        tokenAddress,
        merkleRoot
      )
    } else {
      ledger[tokenAddress].merkleRoot = merkleRoot
    }
  }
)
streetCred.on(streetCred.filters.DeleteMerkleRoot(), async (tokenAddress) => {
  const ledger = await StreetCredStore.ledger
  delete ledger[tokenAddress]
})

export default StreetCredStore
