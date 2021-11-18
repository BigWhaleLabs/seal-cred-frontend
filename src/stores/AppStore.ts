import { isHydrated, makePersistable } from 'mobx-persist-store'
import { makeAutoObservable } from 'mobx'
import Language from 'models/Language'

export type Theme = 'dark' | 'light'
class AppStore {
  language: Language = Language.en
  theme: Theme = 'dark'
  ethaddress = ''

  constructor() {
    makeAutoObservable(this)
    void makePersistable(this, {
      name: 'AppStore',
      properties: ['language', 'theme', 'ethaddress'],
      storage: window.localStorage,
    })
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark'
  }

  get isHydrated() {
    return isHydrated(this)
  }
}

export default new AppStore()
