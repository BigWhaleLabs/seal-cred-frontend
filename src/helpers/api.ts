import { AxiosResponse } from 'axios'
import { Identities } from 'components/Identity'
import Api from 'helpers/axios'
import Template from 'models/Template'
import Token from 'models/Token'

export async function fetchTemplates(query: { identity: Identities }) {
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
