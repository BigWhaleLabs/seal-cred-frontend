import Network from 'models/Network'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_VERIFY_URL}/v0.2.1/verify`

interface SignatureResponse {
  signature: string
  message: string
}

export async function requestAddressOwnershipAttestation(
  signature: string,
  message: string
) {
  const { data } = await axios.post<SignatureResponse>(
    `${baseURL}/ethereum-address`,
    {
      signature,
      message,
    }
  )
  return data
}

export async function requestBalanceAttestation(
  tokenAddress: string,
  network: Network,
  ownerAddress: string
) {
  const { data } = await axios.post<SignatureResponse>(`${baseURL}/balance`, {
    tokenAddress,
    network,
    ownerAddress,
  })
  return data
}

export async function requestContractMetadata(
  network: Network,
  tokenAddress: string
) {
  const { data } = await axios.post<SignatureResponse>(`${baseURL}/balance`, {
    tokenAddress,
    network,
  })
  return data
}

export async function getPublicKey() {
  const { data } = await axios.get<{
    x: string
    y: string
  }>(`${baseURL}/eddsa-public-key`)
  return data
}

export function sendEmail(email: string) {
  return axios.post(`${baseURL}/email`, {
    email,
  })
}
