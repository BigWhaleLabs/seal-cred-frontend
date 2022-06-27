import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class AnnouncementStore extends PersistableStore {
  announcementClosed = false
}

export default proxy(new AnnouncementStore()).makePersistent(true)
