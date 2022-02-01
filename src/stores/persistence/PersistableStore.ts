import { subscribe } from 'valtio'
import SequreLS from 'secure-ls'

const ls = new SequreLS({
  encodingType: 'des',
  isCompression: false,
  encryptionSecret: `${import.meta.env.ENCRYPT_KEY}`,
})
export default class PersistableStore {
  reviver = (_: string, value: unknown) => value
  replacer = (_: string, value: unknown) => value

  persist(encrypt: boolean) {
    const json = JSON.stringify(this, this.replacer)
    encrypt
      ? ls.set(this.constructor.name, json)
      : localStorage.setItem(this.constructor.name, json)
  }

  makePersistent(encrypt: boolean = false) {
    // Start persisting
    subscribe(this, () => {
      this.persist(encrypt)
    })
    // Recover the store
    if (encrypt && this.checkIfJsonFormat(this.constructor.name)) {
      ls.set(this.constructor.name, localStorage.getItem(this.constructor.name))
    }
    const savedString = encrypt
      ? ls.get(this.constructor.name)
      : localStorage.getItem(this.constructor.name)
    if (savedString) {
      const savedState = JSON.parse(savedString, this.reviver)
      Object.assign(this, savedState)
    }
    // Persist just in case
    this.persist(encrypt)
    // Allow chaining
    return this
  }

  checkIfJsonFormat(name: string): boolean {
    const savedString = localStorage.getItem(name)
    if (savedString === null) return false
    try {
      JSON.parse(savedString, this.reviver)
    } catch (error) {
      return false
    }
    return true
  }
}
