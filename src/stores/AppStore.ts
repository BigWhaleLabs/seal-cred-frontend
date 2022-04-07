import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import Theme from 'models/Theme'

class AppStore extends PersistableStore {
  theme: Theme = 'dark'
}

export default proxy(new AppStore()).makePersistent()
