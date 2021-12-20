import { proxy } from 'valtio'

class EthStore {
  accounts: string[] = []

  constructor() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.accounts = accounts as string[]
      })
    }
  }

  async fetchAccounts() {
    if (window.ethereum) {
      this.accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[]
    }
  }

  isMetaMaskInstalled() {
    if (window.ethereum) {
      return true
    } else {
      return false
    }
  }
}

export default proxy(new EthStore())
