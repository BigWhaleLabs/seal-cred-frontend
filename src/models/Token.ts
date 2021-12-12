import { Identities } from 'components/Identity'

export enum TokenStatus {
  unminted = 'unminted',
  minted = 'minted',
  linked = 'linked',
}

export default interface Token {
  status: TokenStatus
  token: string
  template: string
  details: {
    name: string
    identity: Identities
  }
}
