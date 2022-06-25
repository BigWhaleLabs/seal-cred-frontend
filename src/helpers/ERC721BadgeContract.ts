import BaseBadgeContract from 'helpers/BaseBadgeContract'

export default class ERC721BadgeContract extends BaseBadgeContract {
  originalERC721: string

  constructor(address: string, originalERC721: string) {
    super(address)
    this.originalERC721 = originalERC721
  }
}
