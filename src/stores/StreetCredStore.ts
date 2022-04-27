import { getOriginalContracts } from 'helpers/fetchTokens'
import { proxy } from 'valtio'
import Ledger from 'types/Ledger'
import getLedger, { getLedgerRecord } from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

type StreetCredStoreType = {
  ledger: Promise<Ledger>
  originalContracts: Promise<(string | undefined)[]>

  requestOriginalContracts: (account: string) => void
}

const StreetCredStore = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred),
  originalContracts: Promise.resolve([]),

  requestOriginalContracts: (account: string) => {
    StreetCredStore.originalContracts = getOriginalContracts(account)
  },
})

streetCred.on(
  streetCred.filters.SetMerkleRoot(),
  async (tokenAddress, merkleRoot) => {
    const ledger = await StreetCredStore.ledger
    ledger.set(tokenAddress, getLedgerRecord(tokenAddress, merkleRoot))
  }
)
streetCred.on(streetCred.filters.DeleteMerkleRoot(), async (tokenAddress) => {
  const ledger = await StreetCredStore.ledger
  if (ledger.has(tokenAddress)) ledger.delete(tokenAddress)
})

export default StreetCredStore
