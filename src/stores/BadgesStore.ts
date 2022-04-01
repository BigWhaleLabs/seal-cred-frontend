import { getPublicTokens } from 'helpers/api'
import { proxy } from 'valtio'
import PublicAccountStore from 'stores/PublicAccountStore'
import PublicBadge from 'models/PublicBadge'

const BadgesStore = proxy({
  badges: Promise.resolve([]) as Promise<PublicBadge[]>,
  fetchPublicBadges: (address?: string) => {
    BadgesStore.badges = getPublicTokens(
      address || PublicAccountStore.mainEthWallet.address
    )
  },
})

export default BadgesStore
