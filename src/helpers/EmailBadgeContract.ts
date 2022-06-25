import BaseBadgeContract from 'helpers/BaseBadgeContract'

export default class EmailBadgeContract extends BaseBadgeContract {
  domain: string

  constructor(address: string, domain: string) {
    super(address)
    this.domain = domain
  }
}
