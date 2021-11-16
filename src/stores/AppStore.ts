import { isHydrated, makePersistable } from 'mobx-persist-store'
import { makeAutoObservable } from 'mobx'
import Language from 'models/Language'

export type Theme = 'dark' | 'light'
class AppStore {
  language: Language = Language.en
  theme: Theme = 'dark'

  constructor() {
    makeAutoObservable(this)
    void makePersistable(this, {
      name: 'AppStore',
      properties: ['language', 'theme'],
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
