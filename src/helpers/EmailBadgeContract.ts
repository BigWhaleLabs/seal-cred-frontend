import BaseBadgeContract from 'helpers/BaseBadgeContract'

export default class EmailBadgeContract extends BaseBadgeContract {
  domain: string

  constructor(address: string, originalContract: string) {
    super(address)
    this.domain = originalContract
  }
}
