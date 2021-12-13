import { subscribe } from 'valtio'

export default class PersistableStore {
  reviver = (_: string, value: unknown) => value
  replacer = (_: string, value: unknown) => value

  persist() {
    localStorage.setItem(
      this.constructor.name,
      JSON.stringify(this, this.replacer)
    )
  }

  makePersistent() {
    // Start persisting
    subscribe(this, () => {
      this.persist()
    })
    // Recover the store
    const savedString = localStorage.getItem(this.constructor.name)
    if (savedString) {
      const savedState = JSON.parse(savedString, this.reviver)
      Object.assign(this, savedState)
    }
    // Persist just in case
    this.persist()
    // Allow chaining
    return this
  }
}
