import { ethers } from 'ethers'

export const provider = new ethers.providers.InfuraProvider('ropsten') // TODO: Should it be rinkeby?

export default provider
