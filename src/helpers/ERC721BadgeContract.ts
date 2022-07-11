import BaseBadgeContract from 'helpers/BaseBadgeContract'
import Network from 'models/Network'

export default class ERC721BadgeContract extends BaseBadgeContract {
  originalERC721: string
  network: Network

  constructor(address: string, originalERC721: string, network: Network) {
    super(address)
    this.originalERC721 = originalERC721
    this.network = network
  }
}
