import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class EmailDomainStore extends PersistableStore {
  emailDomain = ''
}

export default proxy(new EmailDomainStore()).makePersistent(true)
