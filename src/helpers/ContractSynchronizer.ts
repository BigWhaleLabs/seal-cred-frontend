import defaultProvider from 'helpers/defaultProvider'
import getOwnedERC721 from 'helpers/getOwnedERC721'

export interface ContractSynchronizerSchema {
  account: string
  synchronizedBlockId: number
  addressToTokenIds: { [address: string]: string[] }
}

export default class ContractSynchronizer {
  locked = false
  account: string
  synchronizedBlockId: number
  addressToTokenIds: { [address: string]: Set<string> } = {}

  constructor(
    account: string,
    synchronizedBlockId = -1,
    addressToTokenIds: { [address: string]: Set<string> } = {}
  ) {
    this.account = account
    this.synchronizedBlockId = synchronizedBlockId
    this.addressToTokenIds = addressToTokenIds
  }

  static fromJSON({
    account,
    synchronizedBlockId,
    addressToTokenIds,
  }: {
    account: string
    synchronizedBlockId: number
    addressToTokenIds: { [address: string]: string[] }
  }) {
    return new ContractSynchronizer(
      account,
      synchronizedBlockId,
      Object.entries(addressToTokenIds).reduce(
        (result, [address, tokenIds]) => ({
          ...result,
          [address]: new Set(tokenIds),
        }),
        {}
      )
    )
  }

  toJSON() {
    return {
      account: this.account,
      synchronizedBlockId: this.synchronizedBlockId,
      addressToTokenIds: Object.entries(this.addressToTokenIds).reduce(
        (result, [address, tokenSet]) => ({
          ...result,
          [address]: Array.from(tokenSet),
        }),
        {}
      ),
    }
  }

  tokenIds(address: string) {
    if (!this.addressToTokenIds[address]) return []
    return Array.from(this.addressToTokenIds[address])
  }

  async getOwnedERC721(blockNumber?: number) {
    if (!this.locked) {
      this.locked = true
      try {
        const currentBlockId = !blockNumber
          ? await defaultProvider.getBlockNumber()
          : blockNumber

        if (this.synchronizedBlockId >= currentBlockId) {
          return Object.keys(this.addressToTokenIds)
        }

        this.addressToTokenIds = await getOwnedERC721(
          this.account,
          this.synchronizedBlockId + 1,
          currentBlockId,
          this.addressToTokenIds
        )

        this.synchronizedBlockId = currentBlockId
      } finally {
        this.locked = false
      }
    }

    return Object.keys(this.addressToTokenIds)
  }
}
