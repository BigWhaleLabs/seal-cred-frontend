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

  persist() {
    ls.set(this.constructor.name, JSON.stringify(this, this.replacer))
  }

  makePersistent() {
    // Start persisting
    subscribe(this, () => {
      this.persist()
    })
    // Recover the store
    if (this.checkIfJsonFormat(this.constructor.name)) {
      ls.set(this.constructor.name, localStorage.getItem(this.constructor.name))
    }
    const savedString = ls.get(this.constructor.name)
    if (savedString) {
      const savedState = JSON.parse(savedString, this.reviver)
      Object.assign(this, savedState)
    }
    // Persist just in case
    this.persist()
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
