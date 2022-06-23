import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class AnnouncementStore extends PersistableStore {
  announcementClosed = false
  announcementText =
    'Now introducing zk proof for your work email! Connect wallet to get started.'
}

export default proxy(new AnnouncementStore()).makePersistent(true)