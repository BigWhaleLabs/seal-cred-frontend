import TokenType from 'models/TokenType'

export default interface Token {
  publicOwnerAddress?: string
  type: TokenType
  identityType: string
  extraPublicIdentifier: string
}
