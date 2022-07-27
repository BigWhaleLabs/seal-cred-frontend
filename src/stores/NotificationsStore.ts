import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import setBeforeUnload from 'helpers/setBeforeUnload'

class NotificationsStore extends PersistableStore {
  announcementClosed = false
  showTwitterShare = false
}

const storeProxy = proxy(new NotificationsStore()).makePersistent(true)

setBeforeUnload(() => (storeProxy.showTwitterShare = false))

export default storeProxy
