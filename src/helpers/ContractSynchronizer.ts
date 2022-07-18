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
  mapAddressToTokenIds: { [address: string]: string[] }
}

export default class ContractSynchronizer {
  account: string
  locked = false
  synchronizedBlockId?: number
  mapAddressToTokenIds?: { [address: string]: string[] }

  skipTransactions = new Set<string>()

  constructor(
    account: string,
    mapAddressToTokenIds?: { [address: string]: string[] },
    synchronizedBlockId?: number
  ) {
    this.account = account
    this.synchronizedBlockId = synchronizedBlockId
    this.mapAddressToTokenIds = mapAddressToTokenIds
  }

  static fromJSON({
    account,
    synchronizedBlockId,
    mapAddressToTokenIds,
  }: {
    account: string
    synchronizedBlockId: number
    mapAddressToTokenIds: { [address: string]: string[] }
  }) {
    return new ContractSynchronizer(
      account,
      mapAddressToTokenIds,
      synchronizedBlockId
    )
  }

  toJSON() {
    return {
      account: this.account,
      synchronizedBlockId: this.synchronizedBlockId,
      mapAddressToTokenIds: this.mapAddressToTokenIds,
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

      if (!this.mapAddressToTokenIds) this.mapAddressToTokenIds = {}
      if (!this.mapAddressToTokenIds[address])
        this.mapAddressToTokenIds[address] = []

      const value = tokenId.toString()
      minted.push({
        address,
        tokenId,
      })
      if (!this.mapAddressToTokenIds[address].includes(value))
        this.mapAddressToTokenIds[address].push(value)
      this.skipTransactions.add(transactionHash)
    }
    return minted
  }

  async syncAddressToTokenIds(blockId: number, network: Network) {
    if (!this.locked && blockId !== this.synchronizedBlockId) {
      this.locked = true
      this.mapAddressToTokenIds = await getOwnedERC721(
        this.account,
        typeof this.synchronizedBlockId !== 'undefined'
          ? this.synchronizedBlockId + 1
          : 0,
        blockId,
        { ...this.mapAddressToTokenIds },
        this.skipTransactions,
        network
      )

      this.synchronizedBlockId = blockId
      this.locked = false
    }

    return this.mapAddressToTokenIds
  }
}
