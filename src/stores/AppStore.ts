import { proxy } from 'valtio'
import Language from 'models/Language'
import PersistableStore from 'stores/persistence/PersistableStore'
import Theme from 'models/Theme'

class AppStore extends PersistableStore {
  language: Language = Language.en
  theme: Theme = 'dark'
}

export default proxy(new AppStore()).makePersistent()
