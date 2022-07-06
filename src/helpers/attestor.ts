import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2/verify`

interface SendVerifyResponse {
  signature: string
  message: string
}
export async function requestERC721Attestation(
  signature: string,
  tokenAddress: string,
  message: string
) {
  const { data } = await axios.post<SendVerifyResponse>(
    `${baseURL}/erc721`,
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

interface GetPublicKeyResponse {
  x: string
  y: string
}
export async function getPublicKey() {
  const { data } = await axios.get<GetPublicKeyResponse>(
    `${baseURL}/eddsa-public-key`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

  return data
}

export async function sendEmail(email: string) {
  const data = await axios.post<SendVerifyResponse>(
    `${baseURL}/email`,
    {
      email,
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
