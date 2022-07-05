import { proxy } from 'valtio'
import PersistableStore from 'stores/persistence/PersistableStore'

class EmailDomainStore extends PersistableStore {
  emailDomain: string | undefined = undefined
}

export default proxy(new EmailDomainStore()).makePersistent(true)
