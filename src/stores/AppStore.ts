import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import Theme from 'models/Theme'

class AppStore extends PersistableStore {
  theme: Theme = 'dark'
  warningAccepted = false
}

export default proxy(new AppStore()).makePersistent()
