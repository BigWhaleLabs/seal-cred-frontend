import { PersistableStore } from '@big-whale-labs/store-utils'
import { proxy } from 'valtio'
import env from 'helpers/env'

class EmailDomainStore extends PersistableStore {
  emailDomain = ''
}

export default proxy(new EmailDomainStore()).makePersistent(
  true,
  env.VITE_ENCRYPT_KEY
)
