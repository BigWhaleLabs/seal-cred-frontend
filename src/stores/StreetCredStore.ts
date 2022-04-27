import { ERC721 } from '@big-whale-labs/street-cred-ledger-contract'
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
  originalOwnedTokens: Promise<ERC721[]>
  derivativeOwnedTokens: Promise<ERC721[]>

  refreshOriginalContracts: (account?: string) => void
  refreshDerivativeContracts: (account?: string) => void
}

const StreetCredStore: StreetCredStoreType = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred),
  originalOwnedTokens: Promise.resolve([]),
  derivativeOwnedTokens: Promise.resolve([]),

  refreshOriginalContracts: async (account?: string) => {
    StreetCredStore.originalOwnedTokens = getOriginalContracts(
      await StreetCredStore.ledger,
      account
    )
  },
  refreshDerivativeContracts: async (account?: string) => {
    const tokens = await getDerivativeContracts(account)
    return Promise.all(tokens.map((contract) => contract?.name()))
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
