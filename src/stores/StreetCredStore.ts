import {
  getDerivativeContracts,
  getOriginalContracts,
} from 'helpers/fetchTokens'
import { proxy } from 'valtio'
import Ledger from 'types/Ledger'
import getLedger, { getLedgerRecord } from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

type StreetCredStoreType = {
  ledger: Promise<Ledger>
  originalOwnedTokens: Promise<(string | undefined)[]>
  derivativeOwnedTokens: Promise<(string | undefined)[]>

  requestOriginalContracts: (
    account?: string
  ) => Promise<(string | undefined)[]>
  requestDerivativeContracts: (
    account?: string
  ) => Promise<(string | undefined)[]>
}

const StreetCredStore = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred),
  originalOwnedTokens: Promise.resolve([]),
  derivativeOwnedTokens: Promise.resolve([]),

  requestOriginalContracts: async (account?: string) => {
    const tokens = await getOriginalContracts(account)
    return Promise.all(tokens.map((contract) => contract?.name()))
  },
  requestDerivativeContracts: async (account?: string) => {
    const tokens = await getDerivativeContracts(account)
    return Promise.all(
      tokens.map((contract) => {
        console.log('Symbol: ', contract?.symbol())
        return contract?.name()
      })
    )
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
