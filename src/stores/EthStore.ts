import { proxy } from 'valtio'

class EthStore {
  constructor() {
    console.log('address', window.ethereum.selectedAddress)
  }
}

export default proxy(new EthStore())
