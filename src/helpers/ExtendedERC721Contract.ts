import {
  ERC721,
  ERC721__factory,
} from '@big-whale-labs/street-cred-ledger-contract'
import defaultProvider from 'helpers/defaultProvider'

export default class ExtendedERC721Contract {
  contract: ERC721
  merkleRoot: string

  constructor(address: string, merkleRoot: string) {
    this.contract = ERC721__factory.connect(address, defaultProvider)
    this.merkleRoot = merkleRoot
  }

  isAddressOwner(address: string) {
    return !!Number(this.contract.balanceOf(address))
  }

  async getMapOfOwners() {
    const eventsFilter = this.contract.filters.Transfer()
    const events = await this.contract.queryFilter(eventsFilter)
    const ownerMap = new Map<string, number>()
    for (const event of events) {
      if (!event.args) {
        continue
      }
      const { to, tokenId } = event.args
      if (to) {
        ownerMap.set(to, tokenId.toNumber())
      }
    }
    return ownerMap
  }

  async getAllAccountTokenIds(account: string) {
    const eventsFilter = this.contract.filters.Transfer()
    const events = await this.contract.queryFilter(eventsFilter)
    const ids = events
      .filter((event) => event.args.to.toLowerCase() === account.toLowerCase())
      .map((event) => Number(event.args.tokenId))
    return ids
  }

  async getTokenId(account: string) {
    const eventsFilter = this.contract.filters.Transfer()
    const events = await this.contract.queryFilter(eventsFilter)
    const event = events.find(
      (event) => event.args.to.toLowerCase() === account.toLowerCase()
    )

    return event ? Number(event.args.tokenId) : undefined
  }
}
