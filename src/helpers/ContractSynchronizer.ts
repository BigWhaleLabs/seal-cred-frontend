import { ContractReceipt } from 'ethers'
import MintedToken from 'models/MintedToken'
import Network from 'models/Network'
import getOwnedERC721, {
  isTransferEvent,
  parseLogData,
} from 'helpers/getOwnedERC721'
import transformObjectValues from 'helpers/transformObjectValues'

export interface ContractSynchronizerSchema {
  account: string
  synchronizedBlockId: number
  addressToTokenIds: { [address: string]: string[] }
}

export default class ContractSynchronizer {
  account: string
  locked = false
  synchronizedBlockId?: number
  addressToTokenIds?: { [address: string]: Set<string> }
  requestedAddressToTokenIds?: Promise<{ [address: string]: Set<string> }>
  skipTransactions = new Set<string>()

  constructor(
    account: string,
    addressToTokenIds?: { [address: string]: Set<string> },
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
    const addressToTokenSetIds = transformObjectValues(
      addressToTokenIds,
      (tokenIds) => new Set(tokenIds)
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
      addressToTokenIds: transformObjectValues(
        this.addressToTokenIds || {},
        Array.from
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

      if (!this.addressToTokenIds) this.addressToTokenIds = {}
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
    if (!this.addressToTokenIds || !this.addressToTokenIds[address]) return []
    return Array.from(this.addressToTokenIds[address])
  }

  getOwnedERC721(blockId: number, network: Network) {
    if (!this.locked && blockId !== this.synchronizedBlockId) {
      this.locked = true
      this.requestedAddressToTokenIds = getOwnedERC721(
        this.account,
        typeof this.synchronizedBlockId !== 'undefined'
          ? this.synchronizedBlockId + 1
          : 0,
        blockId,
        this.addressToTokenIds || {},
        this.skipTransactions,
        network
      ).then((result) => {
        this.addressToTokenIds = result
        this.synchronizedBlockId = blockId
        this.locked = false
        return result
      })
    }

    return this.contractsOwned
  }

  get contractsOwned() {
    if (!this.addressToTokenIds) {
      if (!this.requestedAddressToTokenIds) return Promise.resolve([])
      return this.requestedAddressToTokenIds?.then((result) =>
        Object.keys(result)
      )
    }
    return Promise.resolve(Object.keys(this.addressToTokenIds))
  }
}
