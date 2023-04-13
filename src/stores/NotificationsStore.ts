import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'
import setBeforeUnload from 'helpers/setBeforeUnload'

class NotificationsStore extends PersistableStore {
  announcementClosed = false
  showTwitterShare = false
  showCookie = true
}

const storeProxy = proxy(new NotificationsStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)

setBeforeUnload(() => (storeProxy.showTwitterShare = false))

export default storeProxy
