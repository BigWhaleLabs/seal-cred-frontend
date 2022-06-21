import axios from 'axios'
import env from 'helpers/env'

const baseURL = env.VITE_VERIFY_URL

export async function requestERC721Attestation(
  signature: string,
  tokenAddress: string,
  message: string
) {
  const { data } = await axios.post<{
    signature: string
    message: string
  }>(
    `${baseURL}/verify/erc721`,
    {
      signature,
      tokenAddress,
      message,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

  return data
}

export async function getPublicKey() {
  const { data } = await axios.get<{
    x: string
    y: string
  }>(`${baseURL}/verify/eddsa-public-key`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  return data
}
