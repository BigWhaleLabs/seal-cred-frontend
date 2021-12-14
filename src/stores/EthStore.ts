import { proxy } from 'valtio'

// TODO: handle no provider
// TODO: handle no metamask
// TODO: handle verification
// TODO: add a way to re-connect the metamask?

class EthStore {
  accounts: string[] = []

  constructor() {
    window.ethereum.on('accountsChanged', (accounts) => {
      this.accounts = accounts as string[]
      console.log(this.accounts)
    })
  }

  async fetchAccounts() {
    this.accounts = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as string[]
  }
}

export default proxy(new EthStore())
