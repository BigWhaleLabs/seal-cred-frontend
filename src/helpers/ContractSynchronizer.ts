import { BigNumber } from 'ethers'
import defaultProvider from 'helpers/defaultProvider'
import getOwnedERC721 from 'helpers/getOwnedERC721'

export default class ContractSynchronizer {
  account: string
  locked = false
  synchronizedBlockId = 0
  addressToTokenIds: { [token: string]: Set<BigNumber> } = {}

  constructor(account: string) {
    this.account = account
  }

  async getOwnedERC721() {
    if (!this.locked) {
      this.locked = true
      try {
        const currentBlockId = await defaultProvider.getBlockNumber()
        this.addressToTokenIds = await getOwnedERC721(
          this.account,
          this.synchronizedBlockId,
          currentBlockId,
          this.addressToTokenIds
        )

        this.synchronizedBlockId = currentBlockId + 1
      } finally {
        this.locked = false
      }
    }

    return Object.keys(this.addressToTokenIds)
  }
}
