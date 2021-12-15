import Api from 'helpers/axios'
import IdentityType from 'models/IdentityType'
import Token from 'models/Token'
import TokenType from 'models/TokenType'

export default async function getPrivateTokens(
  type: IdentityType,
  secret: string
) {
  const { data } = await Api.post<{
    unminted: TokenType[]
    minted: Token[]
    connected: Token[]
  }>('/tokens/private', {
    type,
    secret,
  })
  return data
}

export async function mintDosu(
  type: IdentityType,
  tokenType: TokenType,
  secret: string
) {
  const { data } = await Api.post('/tokens/mint', {
    type,
    tokenType,
    secret,
  })
  return data.doc
}
