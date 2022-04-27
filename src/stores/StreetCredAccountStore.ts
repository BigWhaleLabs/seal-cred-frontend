import { derive } from 'valtio/utils'
import {
  getDerivativeContracts,
  getOriginalContracts,
} from 'helpers/fetchTokens'
import StreetCredStore from 'stores/StreetCredStore'
import WalletStore from 'stores/WalletStore'

export default derive({
  originalOwnedTokens: async (get) =>
    getOriginalContracts(
      await get(StreetCredStore).ledger,
      get(WalletStore).account
    ),

  derivativeOwnerTokens: async (get) =>
    getDerivativeContracts(
      await get(StreetCredStore).ledger,
      get(WalletStore).account
    ),
})
