import { BadgeByContract } from 'models/BadgeToken'
import { proxy } from 'valtio'
import PublicAccountStore, { Account } from 'stores/PublicAccountStore'
import TokenTransaction from 'models/TokenTransaction'
import listAvailableContracts from 'helpers/listAvailableContracts'
import listOwnerTokens from 'helpers/listOwnerTokens'

const derivativeContractAddress = import.meta.env
  .VITE_SC_DERIVATIVE_ADDRESS as string

const TokensStore = proxy({
  badges: Promise.resolve({}),
  requestTokens: (account: Account) => {
    if (!account) return
    TokensStore.badges = TokensStore.checkInviteToken(account)
  },
  async checkInviteToken(account: Account) {
    const availableContracts = await listAvailableContracts(account)
    const tokens: TokenTransaction[] = (await listOwnerTokens(account)).filter(
      (token) => availableContracts.includes(token.contract)
    )

    const owned: { [index: string]: string } = {}

    for (const token of tokens) {
      switch (token.contract) {
        case derivativeContractAddress: {
          const isOwner = await PublicAccountStore.checkAddressIsOwner(
            token.tokenId,
            account.address
          )
          if (isOwner) {
            owned[BadgeByContract.SCD] = token.transaction
          }
          break
        }
        default:
          break
      }
    }
    return owned
  },
})

export default TokensStore
