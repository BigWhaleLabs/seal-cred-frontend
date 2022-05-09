import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/seal-cred-ledger-contract'
import { proxy } from 'valtio'
import Ledger from 'models/Ledger'
import SortedContracts from 'models/SortedContracts'
import filterContracts from 'helpers/filterContracts'
import findByValue from 'helpers/findByValue'
import getLedger, { getLedgerRecord } from 'helpers/ledger'
import getMapOfOwners from 'helpers/getMapOfOwners'
import sealCred from 'helpers/sealCred'

// TODO: listen to ledger's original and derivative contracts Transfer events and update originalContractsOwned and derivativeContractsOwned
// TODO: set up and destroy listeners on the ledger's original and derivative contracts on SetMerkleRoot (when adding a new contract) and DeleteMerkleRoot events

interface SealCredStoreType {
  ledger: Promise<Ledger>
  originalContracts?: Promise<SortedContracts<ERC721>>
  derivativeContracts?: Promise<SCERC721Derivative[]>
  contractNames: { [contractAddress: string]: Promise<string | undefined> }
  derivativeTokenIds: { [contractAddress: string]: number[] }

  handleAccountChange: (account?: string) => Promise<void>
  refreshContractNames: (ledger: Ledger) => void
  refreshDerivativeTokenIds: (account: string) => void
  refreshDerivativeContracts: (account: string) => Promise<void>
}

const SealCredStore = proxy<SealCredStoreType>({
  ledger: getLedger(sealCred).then((ledger) => {
    SealCredStore.refreshContractNames(ledger)
    return ledger
  }),
  contractNames: {},
  derivativeTokenIds: {},

  async handleAccountChange(account?: string) {
    if (!account) {
      SealCredStore.originalContracts = undefined
      SealCredStore.derivativeContracts = undefined
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
    await SealCredStore.refreshDerivativeContracts(account)
    SealCredStore.refreshDerivativeTokenIds(account)
  },

  async refreshDerivativeTokenIds(account: string) {
    SealCredStore.derivativeTokenIds = {}
    if (!account) return
    const derivativeContracts = await SealCredStore.derivativeContracts

    for (const contract of derivativeContracts ?? []) {
      const owners = await getMapOfOwners(contract)
      const tokenIds = findByValue<number, string>(owners, account)
      if (
        !!tokenIds.length &&
        !SealCredStore.derivativeTokenIds[contract.address]
      ) {
        SealCredStore.derivativeTokenIds[contract.address] = tokenIds
      }
    }
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

  async refreshDerivativeContracts() {
    const derivativeContracts = Object.values(await SealCredStore.ledger).map(
      (record) => record.derivativeContract
    )
    SealCredStore.derivativeContracts = Promise.all(derivativeContracts)
  },
})

sealCred.on(
  sealCred.filters.SetMerkleRoot(),
  async (tokenAddress, merkleRoot) => {
    const ledger = await SealCredStore.ledger
    if (!ledger[tokenAddress]) {
      ledger[tokenAddress] = await getLedgerRecord(
        sealCred,
        tokenAddress,
        merkleRoot
      )
    } else {
      ledger[tokenAddress].merkleRoot = merkleRoot
    }
  }
)
sealCred.on(sealCred.filters.DeleteMerkleRoot(), async (tokenAddress) => {
  const ledger = await SealCredStore.ledger
  delete ledger[tokenAddress]
})

export default SealCredStore
