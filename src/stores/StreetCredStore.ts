import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import { proxy } from 'valtio'
import Ledger from 'types/Ledger'
import SortedContracts from 'types/SortedContracts'
import filterContracts from 'helpers/filterContracts'
import getLedger, { getLedgerRecord } from 'helpers/ledger'
import streetCred from 'helpers/streetCred'

interface StreetCredStoreType {
  ledger: Promise<Ledger>
  originalContracts?: Promise<SortedContracts<ERC721>>
  derivativeContracts?: Promise<SortedContracts<SCERC721Derivative>>
  contractNames: { [contractAddress: string]: Promise<string | undefined> }

  setupContractListeners: () => void
  handleAccountChange: (account?: string) => Promise<void>
  refreshContracts: (account?: string) => Promise<void>
  refreshContractNames: (ledger: Ledger) => void
}

const StreetCredStore = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred).then((ledger) => {
    StreetCredStore.refreshContractNames(ledger)
    return ledger
  }),
  contractNames: {},

  async setupContractListeners() {
    const ledger = await StreetCredStore.ledger
    for (const { originalContract, derivativeContract } of Object.values(
      ledger
    )) {
      originalContract.on(originalContract.filters.Transfer(), () => {
        void StreetCredStore.refreshContracts()
      })
      derivativeContract.on(derivativeContract.filters.Transfer(), () => {
        void StreetCredStore.refreshContracts()
      })
    }
  },

  async refreshContracts(account?: string) {
    const ledger = await StreetCredStore.ledger
    const originalContracts = Object.values(ledger).map(
      (record) => record.originalContract
    )
    StreetCredStore.originalContracts = filterContracts(
      originalContracts,
      account
    )
    const derivativeContracts = Object.values(ledger).map(
      (record) => record.derivativeContract
    )
    StreetCredStore.derivativeContracts = filterContracts(
      derivativeContracts,
      account
    )
    StreetCredStore.refreshContractNames(ledger)
  },

  async handleAccountChange(account?: string) {
    if (!account) {
      StreetCredStore.originalContracts = undefined
      StreetCredStore.derivativeContracts = undefined
      return
    }
    await StreetCredStore.refreshContracts(account)
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

StreetCredStore.setupContractListeners()

export default StreetCredStore
