import { isHydrated, makePersistable } from 'mobx-persist-store'
import { makeAutoObservable, runInAction } from 'mobx'
import { requestMessage, verifyNonce } from 'helpers/api'

const { ethereum } = window

class UserStore {
  token = ''
  address = ''

  constructor() {
    makeAutoObservable(this)
    void makePersistable(this, {
      name: 'UserStore',
      properties: ['token', 'address'],
      storage: window.localStorage,
    })
  }

  async connect() {
    if (!ethereum) return
    await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const [from] = await ethereum.request({ method: 'eth_accounts' })
    const { message } = await requestMessage(from)

    const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`
    const sign = await ethereum.request({
      method: 'personal_sign',
      params: [msg, from, 'Example password'],
    })

    const { token } = await verifyNonce(message, sign)

    runInAction(() => {
      if (!token || !from) return
      this.token = token
      this.address = from
    })
  }

  get isHydrated() {
    return isHydrated(this)
  }
}

export default new UserStore()
