import IdentityType from 'models/IdentityType'

export default interface ConnectedIdentity {
  type: IdentityType
  name: string
  identifier: string
  secret: string
}
