import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class AnnounceStore extends PersistableStore {
  announceClosed = false
  announceText =
    'Now introducing zk proof for your work email! Connect wallet to get started.'
}

export default proxy(new AnnounceStore()).makePersistent(true)
