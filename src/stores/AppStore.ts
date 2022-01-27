import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'
import Theme from 'models/Theme'

type LinkedTokenObject = {
  identityType: string
  type: string
  updatedAt?: number
}
interface LinkedToken extends LinkedTokenObject {
  identifier: string
}

type LinkedTokenMap = {
  [identifier: string]: LinkedTokenObject
}

class AppStore extends PersistableStore {
  theme: Theme = 'dark'
  linked: LinkedTokenMap = {}

  addLinkedToken({ identifier, identityType, type }: LinkedToken) {
    this.linked[identifier] = { updatedAt: Date.now(), identityType, type }
  }

  removeLinkedToken(identifier: string) {
    delete this.linked[identifier]
  }
}

export default proxy(new AppStore()).makePersistent()
