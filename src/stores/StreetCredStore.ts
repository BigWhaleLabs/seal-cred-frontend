import { SCERC721Derivative } from '@big-whale-labs/street-cred-ledger-contract'
import {
  getDerivativeUnmintedContracts,
  getOriginalContracts,
} from 'helpers/fetchTokens'
import { proxy } from 'valtio'
import Ledger from 'types/Ledger'
import getLedger, { getLedgerRecord } from 'helpers/getLedger'
import streetCred from 'helpers/streetCred'

type StreetCredStoreType = {
  ledger: Promise<Ledger>
  originalOwnedTokens: Promise<(string | undefined)[]>
  unmintedDerivatives: Promise<SCERC721Derivative[]>

  requestOriginalContracts: (account?: string) => void
  refreshUnmintedDerivatives: (account?: string) => void
}

const StreetCredStore = proxy<StreetCredStoreType>({
  ledger: getLedger(streetCred),
  originalOwnedTokens: Promise.resolve([]),
  unmintedDerivatives: Promise.resolve([]),

  refreshUnmintedDerivatives: async (account?: string) => {
    StreetCredStore.unmintedDerivatives = getDerivativeUnmintedContracts(
      await StreetCredStore.ledger,
      account
    )
  },
  requestOriginalContracts: async (account?: string) => {
    const tokens = await getOriginalContracts(account)
    StreetCredStore.originalOwnedTokens = Promise.all(
      tokens.map((ctx) => ctx?.name())
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
