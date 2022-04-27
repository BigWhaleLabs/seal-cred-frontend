import {
  ERC721,
  SCERC721Derivative,
} from '@big-whale-labs/street-cred-ledger-contract'
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
  originalContracts: Promise<ERC721[]>
  derivativeContracts: Promise<SCERC721Derivative[]>

  refreshOriginalContracts: (account?: string) => void
  refreshDerivativeContracts: (account?: string) => void
}

const StreetCredStore: StreetCredStoreType = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred),
  originalContracts: Promise.resolve([]),
  derivativeContracts: Promise.resolve([]),

  refreshOriginalContracts: async (account?: string) => {
    StreetCredStore.originalContracts = getOriginalContracts(
      await StreetCredStore.ledger,
      account
    )
  },
  refreshDerivativeContracts: async (account?: string) => {
    StreetCredStore.derivativeContracts = getDerivativeContracts(
      await StreetCredStore.ledger,
      account
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
