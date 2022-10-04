import { proxy } from 'valtio'
import env from 'helpers/env'

import { WalletStore as BaseWalletStore } from '@upacyxou/stores'

class WalletStore extends BaseWalletStore {
  mintLoading = false
  walletsToNotifiedOfBeingDoxxed = {} as {
    [address: string]: boolean
  }

  constructor(...args: ConstructorParameters<typeof BaseWalletStore>) {
    super(...args)
  }

  get isAccountNotifiedOfBeingDoxxed() {
    return this.account && this.walletsToNotifiedOfBeingDoxxed[this.account]
  }
}

const walletStore = proxy(
  new WalletStore(
    env.VITE_ETH_RPC,
    env.VITE_ETH_NETWORK,
    env.VITE_APP_NAME,
    env.VITE_CHAIN_ID,
    ['mintLoading']
  )
).makePersistent(env.VITE_ENCRYPT_KEY)

if (walletStore.cachedProvider)
  void walletStore.changeNetworkOrConnect({ clearCachedProvider: false })

export default walletStore
