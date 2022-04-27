import { proxy } from 'valtio'
import Ledger from 'types/Ledger'
import fetchTokensOwned from 'helpers/fetchTokens'
import getLedger, { getLedgerRecord } from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

type StreetCredStoreType = {
  ledger: Promise<Ledger>
  ownedTokens: Promise<string[]>
}

const StreetCredStore = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred),
  ownedTokens: fetchTokensOwned(),
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
