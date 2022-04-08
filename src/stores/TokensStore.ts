import { BadgeByContract } from 'models/BadgeToken'
import { proxy } from 'valtio'
import PublicAccountStore from 'stores/PublicAccountStore'
import TokenTransaction from 'models/TokenTransaction'
import listAvaliableContract from 'helpers/listAvaliableContracts'
import listOwnerTokens from 'helpers/listOwnerTokens'

const derivativeContractAddress = import.meta.env
  .VITE_SC_DERIVATIVE_ADDRESS as string

const TokensStore = proxy({
  badges: Promise.resolve({}),
  requestTokens: (address: string) => {
    if (!address) return
    TokensStore.badges = TokensStore.checkInviteToken(address)
  },
  async checkInviteToken(ethAddress: string) {
    const avaliableContract = await listAvaliableContract()
    const tokens: TokenTransaction[] = (
      await listOwnerTokens(ethAddress)
    ).filter((token) => avaliableContract.includes(token.contract))

    const owned: { [index: string]: string } = {}

    for (const token of tokens) {
      switch (token.contract) {
        case derivativeContractAddress: {
          const isOwner = await PublicAccountStore.checkAddresIsOwner(
            token.tokenId,
            ethAddress
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
