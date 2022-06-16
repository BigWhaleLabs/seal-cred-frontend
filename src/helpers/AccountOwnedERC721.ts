import defaultProvider from 'helpers/defaultProvider'
import getOwnedERC721 from 'helpers/getOwnedERC721'

export default class AccountOwnedERC721 {
  account: string
  locked = false
  synchronizedBlockId = 0
  tokenState: { [token: string]: number } = {}

  constructor(account: string) {
    this.account = account
  }

  async getOwnedERC721() {
    if (!this.locked) {
      this.locked = true
      try {
        const currentBlockId = await defaultProvider.getBlockNumber()
        this.tokenState = await getOwnedERC721(
          this.account,
          this.synchronizedBlockId,
          currentBlockId,
          this.tokenState
        )
        this.synchronizedBlockId = currentBlockId + 1
      } finally {
        this.locked = false
      }
    }

    return Object.keys(this.tokenState)
  }
}
