import { PersistableStore } from '@big-whale-labs/stores'
import { proxy } from 'valtio'
import env from 'helpers/env'

class EmailDomainStore extends PersistableStore {
  emailDomain = ''
  hasToken = false

  replacer = (key: string, value: unknown) => {
    const disallowList = ['hasToken']
    return disallowList.includes(key) ? undefined : value
  }
}

export default proxy(new EmailDomainStore()).makePersistent(
  env.VITE_ENCRYPT_KEY
)
