import ConnectedIdentity from 'models/ConnectedIdentity'
import PublicBadge from 'models/PublicBadge'
import Token from 'models/Token'
import TokenType from 'models/TokenType'

export default function titleForToken(
  token: Token | TokenType | PublicBadge,
  connectedIdentity?: ConnectedIdentity
) {
  if (typeof token === 'string') {
    if (token === TokenType.dosuHandle) {
      return `Owner of @${connectedIdentity?.identifier} at Dosu`
    } else if (token === TokenType.dosu1wave) {
      return 'Dosu 1 wave invite holder'
    } else {
      return token
    }
  } else {
    return token.type === TokenType.dosuHandle
      ? `Owner of @${token.extraPublicIdentifier} at Dosu`
      : token.type
  }
}
