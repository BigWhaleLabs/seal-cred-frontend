import getOwnedERC721 from 'helpers/getOwnedERC721'

export default class ContractSynchronizer {
  account: string
  locked = false
  synchronizedBlockId?: number
  addressToTokenIds: { [address: string]: Set<string> } = {}

  constructor(account: string) {
    this.account = account
  }

  tokenIds(address: string) {
    if (!this.addressToTokenIds[address]) return []
    return Array.from(this.addressToTokenIds[address])
  }

  async getOwnedERC721(blockId: number) {
    if (!this.locked && blockId !== this.synchronizedBlockId) {
      this.locked = true
      try {
        this.addressToTokenIds = await getOwnedERC721(
          this.account,
          typeof this.synchronizedBlockId !== 'undefined'
            ? this.synchronizedBlockId + 1
            : 0,
          blockId,
          this.addressToTokenIds
        )

        this.synchronizedBlockId = blockId
      } finally {
        this.locked = false
      }
    }

    return Object.keys(this.addressToTokenIds)
  }
}
