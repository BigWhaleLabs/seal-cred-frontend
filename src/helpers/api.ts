import { AxiosResponse } from 'axios'
import { Identities } from 'components/Identity'
import Api from 'helpers/axios'
import Template from 'models/Template'
import Token from 'models/Token'

export async function requestNonce(address: string) {
  const { data }: AxiosResponse<{ nonce: string }> = await Api.post(
    '/login/request',
    {
      address,
    }
  )
  return data
}

export async function verifyNonce(nonce: string) {
  const { data }: AxiosResponse<{ nonce: string }> = await Api.post(
    '/login/verify',
    {
      nonce,
    }
  )
  return data
}

export async function fetchTemplates(query: { identity?: Identities }) {
  const { data }: AxiosResponse<Template[]> = await Api.get('/template', {
    params: query,
  })
  return data
}

export async function fetchTokens(address: string) {
  const { data }: AxiosResponse<Token[]> = await Api.get(
    `/token/${address}`,
    {}
  )
  return data
}

export async function createBadge(badge: string) {
  const { data }: AxiosResponse<Token> = await Api.post(
    `/token/create/${badge}`,
    {}
  )
  return data
}

export async function linkBadge(badge: string, link?: boolean) {
  const { data }: AxiosResponse<Token> = await Api.patch(
    `/token/link/${badge}`,
    {
      link,
    }
  )
  return data
}
