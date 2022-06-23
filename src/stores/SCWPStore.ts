import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class SCWPStore extends PersistableStore {
  announceClosed = false
}

export default proxy(new SCWPStore()).makePersistent(true)
