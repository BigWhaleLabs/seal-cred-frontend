import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class SCWPStore extends PersistableStore {
  announceClosed = false
}

const scwpStore = proxy(new SCWPStore()).makePersistent(true)

export default scwpStore
