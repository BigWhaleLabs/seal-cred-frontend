import { isHydrated, makePersistable } from 'mobx-persist-store'
import { makeAutoObservable, runInAction } from 'mobx'
import { requestNonce, verifyNonce } from 'helpers/api'

const { ethereum } = window

class UserStore {
  ethaddress = ''
  signaddress = ''

  constructor() {
    makeAutoObservable(this)
    void makePersistable(this, {
      name: 'UserStore',
      properties: ['ethaddress', 'signaddress'],
      storage: window.localStorage,
    })
  }

  async connect() {
    if (!ethereum) return
    await ethereum.request({
      method: 'eth_requestAccounts',
    })
    const [from] = await ethereum.request({ method: 'eth_accounts' })
    const { nonce } = await requestNonce(from)
    const exampleMessage = `Hi there! Your special nonce: ${nonce}`
    const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`
    const sign = await ethereum.request({
      method: 'personal_sign',
      params: [msg, from, 'Example password'],
    })

    runInAction(() => {
      this.ethaddress = from
      this.signaddress = sign
    })

    await verifyNonce(nonce)
  }

  get isHydrated() {
    return isHydrated(this)
  }
}

export default new UserStore()
