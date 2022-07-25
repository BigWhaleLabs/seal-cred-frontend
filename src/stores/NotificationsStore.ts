import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import useBeforeUnload from 'hooks/useBeforeUnload'

class NotificationsStore extends PersistableStore {
  announcementClosed = false
  shareToTwitterClosed = false
}

const storeProxy = proxy(new NotificationsStore()).makePersistent(true)

useBeforeUnload(() => (storeProxy.shareToTwitterClosed = true))

export default storeProxy
