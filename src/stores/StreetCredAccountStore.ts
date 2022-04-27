import { derive } from 'valtio/utils'
import {
  getDerivativeContracts,
  getOriginalContracts,
} from 'helpers/fetchTokens'
import Ledger from 'types/Ledger'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

async function fetchOriginalTokens({
  ledger,
  account,
}: {
  ledger: Ledger
  account?: string
}) {
  const tokens = await getOriginalContracts(ledger, account)
  return Promise.all(tokens.map((ctx) => ctx?.name()))
}

async function fetchDerivativeTokens({
  ledger,
  account,
}: {
  ledger: Ledger
  account?: string
}) {
  const tokens = await getDerivativeContracts(ledger, account)
  return Promise.all(tokens.map((ctx) => ctx?.name()))
}

export default derive({
  originalOwnedTokens: async (get) =>
    fetchOriginalTokens({
      ledger: await get(StreetCredStore).ledger,
      account: get(WalletStore).account,
    }),

  derivativeOwnerTokens: async (get) =>
    fetchDerivativeTokens({
      ledger: await get(StreetCredStore).ledger,
      account: get(WalletStore).account,
    }),
})
