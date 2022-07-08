import { ContractReceipt } from 'ethers'
import MintedToken from 'models/MintedToken'
import defaultProvider from 'helpers/defaultProvider'
import getOwnedERC721, {
  isTransferEvent,
  parseLogData,
} from 'helpers/getOwnedERC721'

export default class ContractSynchronizer {
  account: string
  locked = false
  synchronizedBlockId?: number
  addressToTokenIds: { [address: string]: Set<string> } = {}
  skipTransactions = new Set<string>()

  constructor(account: string) {
    this.account = account
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

  async getOwnedERC721() {
    const currentBlockId = await defaultProvider.getBlockNumber()

    if (!this.locked && currentBlockId !== this.synchronizedBlockId) {
      this.locked = true
      try {
        this.addressToTokenIds = await getOwnedERC721(
          this.account,
          typeof this.synchronizedBlockId !== 'undefined'
            ? this.synchronizedBlockId + 1
            : 0,
          currentBlockId,
          this.addressToTokenIds,
          this.skipTransactions
        )

        this.synchronizedBlockId = currentBlockId
      } finally {
        this.locked = false
      }
    }

    return Object.keys(this.addressToTokenIds)
  }
}
