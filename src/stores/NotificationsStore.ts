import { PersistableStore } from '@big-whale-labs/store-utils'
import { proxy } from 'valtio'
import env from 'helpers/env'
import setBeforeUnload from 'helpers/setBeforeUnload'

class NotificationsStore extends PersistableStore {
  announcementClosed = false
  showTwitterShare = false
}

const storeProxy = proxy(new NotificationsStore()).makePersistent(
  true,
  env.VITE_ENCRYPT_KEY
)

setBeforeUnload(() => (storeProxy.showTwitterShare = false))

export default storeProxy
