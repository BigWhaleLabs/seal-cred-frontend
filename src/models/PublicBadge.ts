import IdentityType from 'models/IdentityType'
import TokenType from 'models/TokenType'

export default interface PublicBadge {
  type: TokenType
  identityType: IdentityType
  extraPublicIdentifier?: string
}
