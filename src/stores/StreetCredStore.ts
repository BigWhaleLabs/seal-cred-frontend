import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
import { proxy } from 'valtio'
import Ledger from 'types/Ledger'
import filterContracts from 'helpers/filterContracts'
import getLedger, { getLedgerRecord } from 'helpers/ledger'
import streetCred from 'helpers/streetCred'

// TODO: listen to ledger's original and derivative contracts Transfer events and update originalContractsOwned and derivativeContractsOwned
// TODO: set up and destroy listeners on the ledger's original and derivative contracts on SetMerkleRoot (when adding a new contract) and DeleteMerkleRoot events

type SortedDerivatives = {
  minted: SCERC721Derivative[]
  unminted: SCERC721Derivative[]
}
type SortedOriginals = {
  minted: ERC721[]
  unminted: ERC721[]
}

type StreetCredStoreType = {
  ledger: Promise<Ledger>
  originalContracts?: Promise<SortedOriginals>
  derivativeContracts?: Promise<SortedDerivatives>

  handleAccountChange: (account?: string) => void
}

const StreetCredStore: StreetCredStoreType = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred),

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
    const derivativeContracts = Object.values(ledger).map(
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
