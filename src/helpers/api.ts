import { AxiosResponse } from 'axios'
import { Identities } from 'components/Identity'
import Api from 'helpers/axios'
import Template from 'models/Template'
import Token from 'models/Token'

export async function requestMessage(address: string) {
  const { data }: AxiosResponse<{ message: string }> = await Api.post(
    '/login/request',
    {
      address,
    }
  )
  return data
}

export async function verifyNonce(message: string, signature: string) {
  const { data }: AxiosResponse<{ token: string }> = await Api.post(
    '/login/verify',
    {
      message,
      signature,
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

export async function fetchDosuTemplates(query: {
  token: string
  handle?: string
}) {
  const { data }: AxiosResponse<Template[]> = await Api.get('/template/dosu', {
    params: query,
  })
  return data
}

export async function fetchEtheriumTemplates(query: { address: string }) {
  const { data }: AxiosResponse<Template[]> = await Api.get(
    '/template/etherium',
    {
      params: query,
    }
  )
  return data
}

export async function fetchTokens(address: string) {
  const { data }: AxiosResponse<Token[]> = await Api.get(
    `/token/${address}`,
    {}
  )
  return data
}

export async function createDosuBadge(
  badge: string,
  { token, handle }: { token: string; handle?: string }
) {
  const { data }: AxiosResponse<Token> = await Api.post(
    `/token/dosu/${badge}`,
    {
      token,
      handle,
    }
  )
  return data
}

export async function createEtheriumBadge(badge: string, address: string) {
  const { data }: AxiosResponse<Token> = await Api.post(
    `/token/etherium/${badge}`,
    {
      address,
    }
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
