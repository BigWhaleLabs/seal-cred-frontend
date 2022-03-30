import { ProofBody } from 'helpers/createInput'
import { ScBackApi, ScProofApi } from 'helpers/axios'
import IdentityType from 'models/IdentityType'
import PublicBadge from 'models/PublicBadge'
import Token from 'models/Token'
import TokenType from 'models/TokenType'

export default async function getPrivateTokens(
  type: IdentityType,
  secret: string
) {
  const { data } = await ScBackApi.post<{
    unminted: TokenType[]
    minted: Token[]
    connected: Token[]
  }>('/tokens/private', {
    type,
    secret,
  })
  return data
}

export async function mintToken(
  type: IdentityType,
  tokenType: TokenType,
  secret: string
) {
  const { data } = await ScBackApi.post('/tokens/mint', {
    type,
    tokenType,
    secret,
  })
  return data.doc
}

export async function linkToken(
  type: IdentityType,
  tokenType: TokenType,
  secret: string,
  publicOwnerAddress: string
) {
  const { data } = await ScBackApi.post('/tokens/link', {
    type,
    tokenType,
    secret,
    publicOwnerAddress,
  })
  return data.doc
}

export async function unlinkToken(
  type: IdentityType,
  tokenType: TokenType,
  secret: string
) {
  const { data } = await ScBackApi.post('/tokens/unlink', {
    type,
    tokenType,
    secret,
  })
  return data.doc
}

export async function getPublicTokens(publicAddress: string) {
  const { data } = await ScBackApi.get('/tokens', {
    params: {
      publicAddress,
    },
  })
  return data as PublicBadge[]
}

export async function generateProof(input: ProofBody) {
  const { data } = await ScProofApi.post('/proof', {
    params: {
      input,
    },
  })
  return data as PublicBadge[]
}
