import { ethers } from 'ethers'
import { isHydrated, makePersistable } from 'mobx-persist-store'
import { makeAutoObservable, runInAction } from 'mobx'
import { requestMessage, verifyNonce } from 'helpers/api'

class UserStore {
  token = ''
  address = ''
  privateKey = ''

  constructor() {
    makeAutoObservable(this)
    void makePersistable(this, {
      name: 'UserStore',
      properties: ['token', 'privateKey', 'address'],
      storage: window.localStorage,
    })
  }

  async createWallet() {
    const wallet = await ethers.Wallet.createRandom()
    runInAction(() => {
      this.privateKey = wallet.privateKey
      this.address = wallet.address
    })
    return wallet
  }

  get wallet() {
    if (!this.privateKey) return null
    return new ethers.Wallet(this.privateKey)
  }

  async connect(wallet: ethers.Wallet) {
    const address = wallet.address
    const { message } = await requestMessage(address)
    const sign = await wallet.signMessage(message)
    const { token } = await verifyNonce(message, sign)

    runInAction(() => {
      if (!token || !address) return
      this.token = token
    })
  }

  get isHydrated() {
    return isHydrated(this)
  }
}

export default new UserStore()
