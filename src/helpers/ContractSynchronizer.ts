import { ContractReceipt } from 'ethers'
import MintedToken from 'models/MintedToken'
import Network from 'models/Network'
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
  addressToTokenIds?: { [address: string]: string[] }

  skipTransactions = new Set<string>()

  constructor(
    account: string,
    addressToTokenIds?: { [address: string]: string[] },
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
    return new ContractSynchronizer(
      account,
      addressToTokenIds,
      synchronizedBlockId
    )
  }

  toJSON() {
    return {
      account: this.account,
      synchronizedBlockId: this.synchronizedBlockId,
      addressToTokenIds: this.addressToTokenIds,
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

      if (!this.addressToTokenIds) this.addressToTokenIds = {}
      if (!this.addressToTokenIds[address]) this.addressToTokenIds[address] = []

      const value = tokenId.toString()
      minted.push({
        address,
        tokenId,
      })
      if (!this.addressToTokenIds[address].includes(value))
        this.addressToTokenIds[address].push(value)
      this.skipTransactions.add(transactionHash)
    }
    return minted
  }

  async syncAddressToTokenIds(blockId: number, network: Network) {
    if (!this.locked && blockId !== this.synchronizedBlockId) {
      this.locked = true
      this.addressToTokenIds = await getOwnedERC721(
        this.account,
        typeof this.synchronizedBlockId !== 'undefined'
          ? this.synchronizedBlockId + 1
          : 0,
        blockId,
        this.addressToTokenIds || {},
        this.skipTransactions,
        network
      )

      this.synchronizedBlockId = blockId
      this.locked = false
    }

    return this.addressToTokenIds
  }
}
