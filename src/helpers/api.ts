import Api from 'helpers/axios'
import IdentityType from 'models/IdentityType'
import Token from 'models/Token'
import TokenType from 'models/TokenType'

export default async function getPrivateTokens(
  type: IdentityType,
  secret: string
) {
  const { data } = await Api.get<{
    unminted: TokenType[]
    minted: Token[]
    connected: Token[]
  }>('/tokens/private', {
    params: {
      type,
      secret,
    },
  })
  return data
}
