import { ContractReceipt } from 'ethers'
import MintedToken from 'models/MintedToken'
import getOwnedERC721, {
  isTransferEvent,
  parseLogData,
} from 'helpers/getOwnedERC721'

export interface ContractSynchronizerSchema {
  account: string
  synchronizedBlockId: number
  addressToTokenIds: { [address: string]: string[] }
}

export default class ContractSynchronizer {
  account: string
  locked = false
  synchronizedBlockId?: number
  addressToTokenIds: { [address: string]: Set<string> } = {}
  skipTransactions = new Set<string>()

  constructor(
    account: string,
    addressToTokenIds: { [address: string]: Set<string> } = {},
    synchronizedBlockId?: number
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
    const addressToTokenSetIds = Object.entries(addressToTokenIds).reduce(
      (result, [address, tokenIds]) => ({
        ...result,
        [address]: new Set(tokenIds),
      }),
      {}
    )
    return new ContractSynchronizer(
      account,
      addressToTokenSetIds,
      synchronizedBlockId
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

  applyTransaction(transaction: ContractReceipt) {
    const minted: MintedToken[] = []
    for (const { data, topics, transactionHash, address } of transaction.logs) {
      if (!isTransferEvent(topics)) continue
      if (this.skipTransactions.has(transactionHash)) continue
      const {
        args: { tokenId },
      } = parseLogData({ data, topics })

      if (!this.addressToTokenIds[address])
        this.addressToTokenIds[address] = new Set()

      const value = tokenId.toString()
      minted.push({
        address,
        tokenId,
      })
      this.addressToTokenIds[address].add(value)
      this.skipTransactions.add(transactionHash)
    }
    return minted
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
          this.addressToTokenIds,
          this.skipTransactions
        )

        this.synchronizedBlockId = blockId
      } finally {
        this.locked = false
      }
    }

    return this.contractsOwned
  }

  get contractsOwned() {
    return Object.keys(this.addressToTokenIds)
  }
}
