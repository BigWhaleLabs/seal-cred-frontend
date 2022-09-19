import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'

class EmailFormStore extends PersistableStore {
  emailDomain = ''
}

export default proxy(new EmailFormStore()).makePersistent(env.VITE_ENCRYPT_KEY)
