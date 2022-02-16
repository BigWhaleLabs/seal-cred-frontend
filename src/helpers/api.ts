import Api from 'helpers/axios'
import IdentityType from 'models/IdentityType'
import PublicAccountStore from 'stores/PublicAccountStore'
import PublicBadge from 'models/PublicBadge'
import TimerStore from 'stores/TimerStore'
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

export async function mintToken(
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

export async function linkToken(
  type: IdentityType,
  tokenType: TokenType,
  secret: string,
  publicOwnerAddress: string
) {
  const { data } = await Api.post('/tokens/link', {
    type,
    tokenType,
    secret,
    publicOwnerAddress,
  })
  await PublicAccountStore.addLinkedToken({
    identifier: data.privateOwnerIdentifier,
    identityType: data.identityType,
    type: data.type,
  })
  if (!TimerStore.timerStarted) {
    TimerStore.setTimer()
  }

  return data.doc
}

export async function unlinkToken(
  type: IdentityType,
  tokenType: TokenType,
  secret: string
) {
  const { data } = await Api.post('/tokens/unlink', {
    type,
    tokenType,
    secret,
  })
  PublicAccountStore.removeLinkedToken(data.privateOwnerIdentifier)
  if (!Object.entries(PublicAccountStore.linked).length) {
    TimerStore.removeTimer()
  }
  return data.doc
}

export async function getPublicTokens(publicAddress: string) {
  const { data } = await Api.get('/tokens', {
    params: {
      publicAddress,
    },
  })
  return data as PublicBadge[]
}
