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

  async getListOfOwners() {
    const eventsFilter = this.contract.filters.Transfer()
    const events = await this.contract.queryFilter(eventsFilter)
    const owners = []
    for (const event of events) {
      owners.push(event.args.to)
    }
    return owners
  }
}
