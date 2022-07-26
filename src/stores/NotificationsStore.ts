import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import setBeforeUnload from 'helpers/setBeforeUnload'

class NotificationsStore extends PersistableStore {
  announcementClosed = false
  shareToTwitterClosed = true
}

const storeProxy = proxy(new NotificationsStore()).makePersistent(true)

setBeforeUnload(() => (storeProxy.shareToTwitterClosed = true))

export default storeProxy
